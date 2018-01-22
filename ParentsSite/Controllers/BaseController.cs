using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;
using ParentsSite.Models;

namespace ParentsSite.Controllers
{
    public abstract class BaseController : Controller
    {
        public UserManager<User> _userManager;

        public User CurrentUser { get; set; }

        public BaseController(UserManager<User> userManager)
        {
            _userManager = userManager;
        }
    }
}
