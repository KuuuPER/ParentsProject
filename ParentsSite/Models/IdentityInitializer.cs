using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Identity.EntityFrameworkCore;
using System;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.Extensions.DependencyInjection;
using System.Security.Claims;

namespace ParentsSite.Models
{
    public static class IdentityInitializer
    {
        public static async Task SeedAsync(IServiceProvider serviceProvider)
        {
            var context = serviceProvider.GetService<IdentityDbContext>();
            string[] roles = new string[] {"Administrator", "User" };

            var roleStore = new RoleStore<IdentityRole>(context);

            foreach (var role in roles)
            {
                if (!context.Roles.Any(r => r.Name == role))
                {
                    var identityRole = new IdentityRole(role) { NormalizedName = role.ToLower() };
                    await roleStore.CreateAsync(identityRole);

                    await roleStore.AddClaimAsync(identityRole, new Claim(CustomClaimsTypes.Permission, "view"));
                    await roleStore.AddClaimAsync(identityRole, new Claim(CustomClaimsTypes.Permission, "create"));
                    await roleStore.AddClaimAsync(identityRole, new Claim(CustomClaimsTypes.Permission, "update"));
                }
            }

            var adminUser = new User
            {
                FirstName = "Администратор",
                Email = "admin1199@mail.com",
                NormalizedEmail = "admin1199@mail.com",
                UserName = "Admin",
                NormalizedUserName = "admin",
                EmailConfirmed = true,
                PhoneNumberConfirmed = true,
                SecurityStamp = Guid.NewGuid().ToString("D")
            };


            if (!context.Users.Any(u => u.UserName == adminUser.UserName))
            {
                var password = new PasswordHasher<User>();
                var hashed = password.HashPassword(adminUser, "admin1111");
                adminUser.PasswordHash = hashed;

                var userStore = new UserStore<User>(context);
                var result = await userStore.CreateAsync(adminUser);
            }

            await AssignRoles(serviceProvider, adminUser.Email, roles);

            await context.SaveChangesAsync();
        }

        public static async Task AssignRoles(IServiceProvider services, string email, string[] roles)
        {
            var userManager = services.GetService<UserManager<User>>();
            var user = await userManager.FindByEmailAsync(email);

            foreach (var role in roles)
            {
                if (!await userManager.IsInRoleAsync(user, role))
                {
                    await userManager.AddToRoleAsync(user, role);
                }
            }
        }
    }
}
