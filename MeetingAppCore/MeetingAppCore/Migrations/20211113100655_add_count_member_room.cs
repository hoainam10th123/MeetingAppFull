using Microsoft.EntityFrameworkCore.Migrations;

namespace MeetingAppCore.Migrations
{
    public partial class add_count_member_room : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AddColumn<int>(
                name: "CountMember",
                table: "Rooms",
                type: "int",
                nullable: false,
                defaultValue: 0);
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "CountMember",
                table: "Rooms");
        }
    }
}
