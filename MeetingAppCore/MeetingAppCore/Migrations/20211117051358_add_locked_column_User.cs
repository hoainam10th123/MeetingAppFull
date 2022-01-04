using Microsoft.EntityFrameworkCore.Migrations;

namespace MeetingAppCore.Migrations
{
    public partial class add_locked_column_User : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AddColumn<bool>(
                name: "Locked",
                table: "AspNetUsers",
                type: "bit",
                nullable: false,
                defaultValue: false);
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "Locked",
                table: "AspNetUsers");
        }
    }
}
