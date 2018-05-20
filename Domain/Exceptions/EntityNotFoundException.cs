using System;

namespace Domain.Exceptions
{
    public class EntityNotFoundException: Exception
    {
        private string _entityName;
        private Guid _id;

        public EntityNotFoundException(string entityName, Guid id)
        {
            _entityName = entityName;
            _id = id;
        }

        public EntityNotFoundException(string entityName, Guid id, string message)
        : base(message)
        {
            _entityName = entityName;
            _id = id;
        }

        public EntityNotFoundException(string entityName, Guid id, string message, Exception inner)
        : base(message, inner)
        {
            _entityName = entityName;
            _id = id;
        }

        public override string Message => $"Сущность {_entityName} не найдена по Id - {_id}. \n" + base.Message;
    }
}
