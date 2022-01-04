using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace MeetingAppCore.Dtos
{
    public class MemberDto
    {
        public string UserName { get; set; }
        public string DisplayName { get; set; }
        public DateTime LastActive { get; set; }        
        public string PhotoUrl { get; set; }
        public bool Locked { get; set; }
    }
}
