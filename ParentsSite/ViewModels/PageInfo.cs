namespace ParentsSite.ViewModels
{
    public class PageInfo
    {
        public PageInfo()
        {
            CurrentPage = 1;
            ItemsPerPage = 10;
        }

        public int ItemsPerPage { get; set; }
        public int ItemsCount { get; set; }
        public int CurrentPage { get; set; }
    }
}
