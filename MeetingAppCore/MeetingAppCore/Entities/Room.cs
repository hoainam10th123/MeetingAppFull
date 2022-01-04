using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Linq;
using System.Threading.Tasks;

namespace MeetingAppCore.Entities
{
    public class Room
    {
        [Key]
        [DatabaseGenerated(DatabaseGeneratedOption.Identity)]
        public int RoomId { get; set; }
        public string RoomName { get; set; }
        public int CountMember { get; set; }

        public AppUser AppUser { get; set; }
        public Guid UserId { get; set; }
        public ICollection<Connection> Connections { get; set; } = new List<Connection>();
    }

    public class Connection
    {
        public Connection() { }
        public Connection(string connectionId, string userName)
        {
            ConnectionId = connectionId;
            UserName = userName;
        }
        [Key]
        public string ConnectionId { get; set; }
        public string UserName { get; set; }
    }
}
