using System.Collections.Generic;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using System.Threading.Tasks;
using Domain.Contexts;
using DataAccess;
using ParentsSite.Models;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Authorization;
using System.Linq;

namespace ParentsSite.Controllers
{
    [Route("api/values")]
    public class ValuesController : BaseController
    {
        private UnitOfWork _unitOfWork;

        public ValuesController(UnitOfWork unitOfWork, UserManager<User> userManager) : base(userManager)
        {
            _unitOfWork = unitOfWork;
        }

        // GET api/values
        [HttpGet]
        [Authorize(Roles = "Administrator")]
        public async Task<object> Get()
        {
            try
            {
                var appDbContext = _unitOfWork.Context as AppDbContext;
                var providers = await appDbContext.Providers.ToListAsync();
            }
            catch (System.Exception e)
            {

                throw;
            }


            return User.Claims.Select(c =>
                new
                {
                    Type = c.Type,
                    Value = c.Value
                });
        }

        // GET api/values/5
        [Authorize(Roles = "Administrator", Policy = "view")]
        [HttpGet("{id}")]
        public string Get(int id)
        {
            return "value";
        }

        // POST api/values
        [HttpPost]
        public void Post([FromBody]string value)
        {
        }

        // PUT api/values/5
        [HttpPut("{id}")]
        public void Put(int id, [FromBody]string value)
        {
        }

        // DELETE api/values/5
        [HttpDelete("{id}")]
        public void Delete(int id)
        {
        }
    }
}
