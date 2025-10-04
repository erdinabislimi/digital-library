using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace BibliotekaMS.Migrations
{
    /// <inheritdoc />
    public partial class RemoveUnusedEntities : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropTable(
                name: "Ashensori");

            migrationBuilder.DropTable(
                name: "Programi");

            migrationBuilder.DropTable(
                name: "Ndertesa");

            migrationBuilder.DropTable(
                name: "Universiteti");
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.CreateTable(
                name: "Ndertesa",
                columns: table => new
                {
                    NdertesaId = table.Column<int>(type: "int", nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    Emri = table.Column<string>(type: "nvarchar(max)", nullable: false),
                    Pershkrimi = table.Column<string>(type: "nvarchar(max)", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Ndertesa", x => x.NdertesaId);
                });

            migrationBuilder.CreateTable(
                name: "Universiteti",
                columns: table => new
                {
                    UniversitetiID = table.Column<int>(type: "int", nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    City = table.Column<string>(type: "nvarchar(max)", nullable: false),
                    UniversitetiName = table.Column<string>(type: "nvarchar(max)", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Universiteti", x => x.UniversitetiID);
                });

            migrationBuilder.CreateTable(
                name: "Ashensori",
                columns: table => new
                {
                    AshensoriId = table.Column<int>(type: "int", nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    NdertesaId = table.Column<int>(type: "int", nullable: false),
                    Emri = table.Column<string>(type: "nvarchar(max)", nullable: false),
                    Pershkrimi = table.Column<string>(type: "nvarchar(max)", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Ashensori", x => x.AshensoriId);
                    table.ForeignKey(
                        name: "FK_Ashensori_Ndertesa_NdertesaId",
                        column: x => x.NdertesaId,
                        principalTable: "Ndertesa",
                        principalColumn: "NdertesaId",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.CreateTable(
                name: "Programi",
                columns: table => new
                {
                    ProgramiID = table.Column<int>(type: "int", nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    UniversitetiID = table.Column<int>(type: "int", nullable: false),
                    Duration = table.Column<string>(type: "nvarchar(max)", nullable: false),
                    ProgramName = table.Column<string>(type: "nvarchar(max)", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Programi", x => x.ProgramiID);
                    table.ForeignKey(
                        name: "FK_Programi_Universiteti_UniversitetiID",
                        column: x => x.UniversitetiID,
                        principalTable: "Universiteti",
                        principalColumn: "UniversitetiID",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.CreateIndex(
                name: "IX_Ashensori_NdertesaId",
                table: "Ashensori",
                column: "NdertesaId");

            migrationBuilder.CreateIndex(
                name: "IX_Programi_UniversitetiID",
                table: "Programi",
                column: "UniversitetiID");
        }
    }
}
