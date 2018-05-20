using ParentsSite.Models;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.IdentityModel.Tokens;
using Newtonsoft.Json;
using System;
using System.Collections.Generic;
using System.IdentityModel.Tokens.Jwt;
using System.Security.Claims;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Identity;
using ParentsSite.ViewModels;
using Microsoft.AspNetCore.Authorization;

namespace ParentsSite.Controllers
{
    [AllowAnonymous]
    [Route("api/account")]
    public class AccountController : BaseController
    {
        private SignInManager<User> _signInManager;
        public RoleManager<IdentityRole> _roleManager;
        public AccountController(UserManager<User> userManager, SignInManager<User> signInManager, RoleManager<IdentityRole> roleManager) : base(userManager)
        {
            _userManager = userManager;
            _roleManager = roleManager;
            _signInManager = signInManager;
        }

        [AllowAnonymous]
        [HttpGet]
        public string Index()
        {
            return "Hi!";
        }

        [AllowAnonymous]
        [HttpPost("/token")]
        public async Task Token([FromBody]UserViewModel user)
        {
            var identity = await GetIdentity(user.UserName, user.Password);
            if (identity == null)
            {
                Response.StatusCode = 400;
                await Response.WriteAsync("Invalid username or password.");
                return;
            }

            var now = DateTime.UtcNow;
            // создаем JWT-токен
            var jwt = new JwtSecurityToken(
                    issuer: AuthOptions.ISSUER,
                    audience: AuthOptions.AUDIENCE,
                    notBefore: now,
                    claims: identity.Claims,
                    expires: now.Add(TimeSpan.FromMinutes(AuthOptions.LIFETIME)),
                    signingCredentials: new SigningCredentials(AuthOptions.GetSymmetricSecurityKey(), SecurityAlgorithms.HmacSha256));
            var encodedJwt = new JwtSecurityTokenHandler().WriteToken(jwt);

            var response = new
            {
                access_token = encodedJwt,
                username = identity.Name
            };

            // сериализация ответа
            Response.ContentType = "application/json";
            await Response.WriteAsync(JsonConvert.SerializeObject(response, new JsonSerializerSettings { Formatting = Formatting.Indented }));
        }

        private async Task<ClaimsIdentity> GetIdentity(string username, string password)
        {
            var person = await _userManager.FindByNameAsync(username);
            var signInResult = await _signInManager.CheckPasswordSignInAsync(person, password, false);

            if (signInResult.Succeeded)
            {
                var userPrincipal = await _signInManager.CreateUserPrincipalAsync(person);

                var claims = new List<Claim>();
                var roles = await _userManager.GetRolesAsync(person);

                foreach (var userRole in roles)
                {
                    claims.Add(new Claim(ClaimsIdentity.DefaultRoleClaimType, userRole));

                    var role = await _roleManager.FindByNameAsync(userRole);

                    if (role != null)
                    {
                        var roleClaims = await _roleManager.GetClaimsAsync(role);
                        foreach (Claim roleClaim in roleClaims)
                        {
                            claims.Add(roleClaim);
                        }
                    }
                }

                

                var claimsIdentity = new ClaimsIdentity(claims);
                return claimsIdentity;
            }

            // если пользователя не найдено
            return null;
        }
    }
}
