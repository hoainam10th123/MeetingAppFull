using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace MeetingAppCore.Helpers
{
    public class UserParams : PaginationParams
    {
        public string CurrentUsername { get; set; }
    }
}
