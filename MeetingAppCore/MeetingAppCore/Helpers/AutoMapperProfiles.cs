using AutoMapper;
using MeetingAppCore.Dtos;
using MeetingAppCore.Entities;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace MeetingAppCore.Helpers
{
    public class AutoMapperProfiles : Profile
    {
        public AutoMapperProfiles()
        {
            CreateMap<AppUser, MemberDto>();

            CreateMap<RegisterDto, AppUser>();

            CreateMap<Room, RoomDto>()
                .ForMember(dest => dest.DisplayName, opt => opt.MapFrom(src => src.AppUser.DisplayName))
                .ForMember(dest => dest.UserName, opt => opt.MapFrom(src => src.AppUser.UserName));
        }
    }
}
