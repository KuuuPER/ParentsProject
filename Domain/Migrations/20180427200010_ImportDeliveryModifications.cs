using Microsoft.EntityFrameworkCore.Migrations;
using System;
using System.Collections.Generic;

namespace Domain.Migrations
{
    public partial class ImportDeliveryModifications : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_Purchases_Contacts_ContactId",
                table: "Purchases");

            migrationBuilder.DropForeignKey(
                name: "FK_Purchases_Deliveries_DeliveryId",
                table: "Purchases");

            migrationBuilder.DropIndex(
                name: "IX_Purchases_ContactId",
                table: "Purchases");

            migrationBuilder.DropIndex(
                name: "IX_Purchases_DeliveryId",
                table: "Purchases");

            migrationBuilder.DropColumn(
                name: "ContactId",
                table: "Purchases");

            migrationBuilder.DropColumn(
                name: "DeliveryId",
                table: "Purchases");

            migrationBuilder.DropColumn(
                name: "Notes",
                table: "Deliveries");

            migrationBuilder.AddColumn<string>(
                name: "Notes",
                table: "Purchases",
                nullable: true);

            migrationBuilder.AddColumn<Guid>(
                name: "PurchaseId",
                table: "Contacts",
                nullable: true);

            migrationBuilder.CreateTable(
                name: "DeliveryPurchases",
                columns: table => new
                {
                    DeliveryId = table.Column<Guid>(nullable: false),
                    PurchaseId = table.Column<Guid>(nullable: false),
                    Notes = table.Column<string>(nullable: true),
                    TimeFrom = table.Column<byte>(nullable: false),
                    TimeTo = table.Column<byte>(nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_DeliveryPurchases", x => new { x.DeliveryId, x.PurchaseId });
                    table.ForeignKey(
                        name: "FK_DeliveryPurchases_Deliveries_DeliveryId",
                        column: x => x.DeliveryId,
                        principalTable: "Deliveries",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                    table.ForeignKey(
                        name: "FK_DeliveryPurchases_Purchases_PurchaseId",
                        column: x => x.PurchaseId,
                        principalTable: "Purchases",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.CreateIndex(
                name: "IX_Contacts_PurchaseId",
                table: "Contacts",
                column: "PurchaseId");

            migrationBuilder.CreateIndex(
                name: "IX_DeliveryPurchases_PurchaseId",
                table: "DeliveryPurchases",
                column: "PurchaseId");

            migrationBuilder.AddForeignKey(
                name: "FK_Contacts_Purchases_PurchaseId",
                table: "Contacts",
                column: "PurchaseId",
                principalTable: "Purchases",
                principalColumn: "Id",
                onDelete: ReferentialAction.Restrict);
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_Contacts_Purchases_PurchaseId",
                table: "Contacts");

            migrationBuilder.DropTable(
                name: "DeliveryPurchases");

            migrationBuilder.DropIndex(
                name: "IX_Contacts_PurchaseId",
                table: "Contacts");

            migrationBuilder.DropColumn(
                name: "Notes",
                table: "Purchases");

            migrationBuilder.DropColumn(
                name: "PurchaseId",
                table: "Contacts");

            migrationBuilder.AddColumn<Guid>(
                name: "ContactId",
                table: "Purchases",
                nullable: true);

            migrationBuilder.AddColumn<Guid>(
                name: "DeliveryId",
                table: "Purchases",
                nullable: true);

            migrationBuilder.AddColumn<string>(
                name: "Notes",
                table: "Deliveries",
                nullable: true);

            migrationBuilder.CreateIndex(
                name: "IX_Purchases_ContactId",
                table: "Purchases",
                column: "ContactId");

            migrationBuilder.CreateIndex(
                name: "IX_Purchases_DeliveryId",
                table: "Purchases",
                column: "DeliveryId");

            migrationBuilder.AddForeignKey(
                name: "FK_Purchases_Contacts_ContactId",
                table: "Purchases",
                column: "ContactId",
                principalTable: "Contacts",
                principalColumn: "Id",
                onDelete: ReferentialAction.Restrict);

            migrationBuilder.AddForeignKey(
                name: "FK_Purchases_Deliveries_DeliveryId",
                table: "Purchases",
                column: "DeliveryId",
                principalTable: "Deliveries",
                principalColumn: "Id",
                onDelete: ReferentialAction.Restrict);
        }
    }
}
