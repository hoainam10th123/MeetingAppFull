using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using System;
using System.Collections.Generic;
using System.IO;
using System.Linq;
using System.Threading.Tasks;

namespace MeetingAppCore.Controllers
{
    [Authorize]
    public class RecordVideoController : BaseApiController
    {
        public RecordVideoController()
        {

        }

        [HttpPost]
        public async Task<IActionResult> SaveRecoredFile()
        {
            var formCollection = await Request.ReadFormAsync();
            var files = formCollection.Files;
            if (files.Any())
            {
                var file = files["video-blob"];
                string UploadFolder = Path.Combine(Directory.GetCurrentDirectory(), "wwwroot", "UploadedRecordFiles");
                string UniqueFileName = User.Identity.Name + "_" + DateTime.Now.Year + "-" + DateTime.Now.Month + "-" + DateTime.Now.Minute + ".webm";
                string UploadPath = Path.Combine(UploadFolder, UniqueFileName);

                using (var temp = new FileStream(UploadPath, FileMode.Create))
                {
                    await file.CopyToAsync(temp);// close stream sau khi copy xong do khoi lenh using
                }
                    
                return NoContent();
            }
            else
            {
                return BadRequest("No file created");
            }
        }
    }
}
