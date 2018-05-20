using Microsoft.EntityFrameworkCore.Migrations;
using System;
using System.Collections.Generic;

namespace Domain.Migrations
{
    public partial class MoveAddresToDeliveryPurchase : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "Address",
                table: "Contacts");

            migrationBuilder.AddColumn<string>(
                name: "Address",
                table: "DeliveryPurchases",
                nullable: true);
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "Address",
                table: "DeliveryPurchases");

            migrationBuilder.AddColumn<string>(
                name: "Address",
                table: "Contacts",
                nullable: true);
        }
    }
}
