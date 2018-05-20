using Microsoft.EntityFrameworkCore.Migrations;
using System;
using System.Collections.Generic;

namespace Domain.Migrations
{
    public partial class CascadeOnDelete : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_ImportProduct_Imports_ImportId",
                table: "ImportProduct");

            migrationBuilder.AddForeignKey(
                name: "FK_ImportProduct_Imports_ImportId",
                table: "ImportProduct",
                column: "ImportId",
                principalTable: "Imports",
                principalColumn: "Id",
                onDelete: ReferentialAction.Cascade);
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_ImportProduct_Imports_ImportId",
                table: "ImportProduct");

            migrationBuilder.AddForeignKey(
                name: "FK_ImportProduct_Imports_ImportId",
                table: "ImportProduct",
                column: "ImportId",
                principalTable: "Imports",
                principalColumn: "Id",
                onDelete: ReferentialAction.Restrict);
        }
    }
}
