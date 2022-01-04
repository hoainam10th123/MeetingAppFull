using MeetingAppCore.Dtos;
using MeetingAppCore.Entities;
using MeetingAppCore.Helpers;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace MeetingAppCore.Interfaces
{
    public interface IUserRepository
    {
        Task<AppUser> GetUserByIdAsync(Guid id);
        Task<AppUser> GetUserByUsernameAsync(string username);
        Task<MemberDto> GetMemberAsync(string username);
        Task<PagedList<MemberDto>> GetMembersAsync(UserParams userParams);
        Task<IEnumerable<MemberDto>> SearchMemberAsync(string displayname);
        Task<IEnumerable<MemberDto>> GetUsersOnlineAsync(UserConnectionInfo[] userOnlines);
        Task<AppUser> UpdateLocked(string username);
    }
}
