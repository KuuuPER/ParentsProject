using Domain.Models;
using Services;

namespace ParentsSite.Managers
{
    public class ManufacturesManager: SimpleNameIdManager<Manufacture>
    {
        public ManufacturesService _manufacturesService;
        public ManufacturesManager(ManufacturesService manufacturesService): base(manufacturesService)
        {
            _manufacturesService = manufacturesService;
        }

        public override void Update(Manufacture manufacture)
        {
            var existedManufacture = _manufacturesService.GetEntityById(manufacture.Id);
            existedManufacture.Name = manufacture.Name;
            existedManufacture.Country = manufacture.Country;
            existedManufacture.Description = manufacture.Description;

            _manufacturesService.UpdateEntity(existedManufacture);
        }  
    }
}
