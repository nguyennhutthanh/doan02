using Microsoft.EntityFrameworkCore.Migrations;

namespace DoAnCoSo02.Data.Migrations
{
    public partial class addinterfaceRoom : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AddColumn<int>(
                name: "IdRoomInterface",
                table: "TypeProduct",
                type: "int",
                nullable: true);

            migrationBuilder.AddColumn<int>(
                name: "InterfaceRoomNavigationId",
                table: "TypeProduct",
                type: "int",
                nullable: true);

            migrationBuilder.CreateTable(
                name: "danhmucRooms",
                columns: table => new
                {
                    Id = table.Column<int>(type: "int", nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    TenRoom = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    ImageRoomName = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    urlImageRoom = table.Column<string>(type: "nvarchar(max)", nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_danhmucRooms", x => x.Id);
                });

            migrationBuilder.CreateIndex(
                name: "IX_TypeProduct_InterfaceRoomNavigationId",
                table: "TypeProduct",
                column: "InterfaceRoomNavigationId");

            migrationBuilder.AddForeignKey(
                name: "FK_TypeProduct_danhmucRooms_InterfaceRoomNavigationId",
                table: "TypeProduct",
                column: "InterfaceRoomNavigationId",
                principalTable: "danhmucRooms",
                principalColumn: "Id",
                onDelete: ReferentialAction.Restrict);
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_TypeProduct_danhmucRooms_InterfaceRoomNavigationId",
                table: "TypeProduct");

            migrationBuilder.DropTable(
                name: "danhmucRooms");

            migrationBuilder.DropIndex(
                name: "IX_TypeProduct_InterfaceRoomNavigationId",
                table: "TypeProduct");

            migrationBuilder.DropColumn(
                name: "IdRoomInterface",
                table: "TypeProduct");

            migrationBuilder.DropColumn(
                name: "InterfaceRoomNavigationId",
                table: "TypeProduct");
        }
    }
}
