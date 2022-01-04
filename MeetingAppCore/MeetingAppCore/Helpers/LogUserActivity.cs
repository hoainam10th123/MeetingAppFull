using MeetingAppCore.Extensions;
using MeetingAppCore.Interfaces;
using Microsoft.AspNetCore.Mvc.Filters;
using System;
using System.Collections.Generic;
using Microsoft.Extensions.DependencyInjection;
using System.Threading.Tasks;

namespace MeetingAppCore.Helpers
{
    public class LogUserActivity : IAsyncActionFilter
    {
        public async Task OnActionExecutionAsync(ActionExecutingContext context, ActionExecutionDelegate next)
        {
            var resultContext = await next();

            if (!resultContext.HttpContext.User.Identity.IsAuthenticated) return;

            var userId = resultContext.HttpContext.User.GetUserId();
            var repo = resultContext.HttpContext.RequestServices.GetService<IUnitOfWork>();
            //GetService: Microsoft.Extensions.DependencyInjection
            var user = await repo.UserRepository.GetUserByIdAsync(userId);
            user.LastActive = DateTime.Now;
            await repo.Complete();//add this: services.AddScoped<LogUserActivity>(); [ServiceFilter(typeof(LogUserActivity))] dat truoc controller base
        }
    }
}
