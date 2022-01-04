using MeetingAppCore.Entities;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace MeetingAppCore.Interfaces
{
    public interface ITokenService
    {
        Task<string> CreateTokenAsync(AppUser appUser);
    }
}
