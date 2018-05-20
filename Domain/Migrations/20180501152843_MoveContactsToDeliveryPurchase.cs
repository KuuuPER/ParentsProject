using Microsoft.EntityFrameworkCore.Migrations;
using System;
using System.Collections.Generic;

namespace Domain.Migrations
{
    public partial class MoveContactsToDeliveryPurchase : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_Contacts_Purchases_PurchaseId",
                table: "Contacts");

            migrationBuilder.DropIndex(
                name: "IX_Contacts_PurchaseId",
                table: "Contacts");

            migrationBuilder.RenameColumn(
                name: "PurchaseId",
                table: "Contacts",
                newName: "DeliveryPurchasePurchaseId");

            migrationBuilder.AddColumn<Guid>(
                name: "DeliveryPurchaseDeliveryId",
                table: "Contacts",
                nullable: true);

            migrationBuilder.CreateIndex(
                name: "IX_Contacts_DeliveryPurchaseDeliveryId_DeliveryPurchasePurchaseId",
                table: "Contacts",
                columns: new[] { "DeliveryPurchaseDeliveryId", "DeliveryPurchasePurchaseId" });

            migrationBuilder.AddForeignKey(
                name: "FK_Contacts_DeliveryPurchases_DeliveryPurchaseDeliveryId_DeliveryPurchasePurchaseId",
                table: "Contacts",
                columns: new[] { "DeliveryPurchaseDeliveryId", "DeliveryPurchasePurchaseId" },
                principalTable: "DeliveryPurchases",
                principalColumns: new[] { "DeliveryId", "PurchaseId" },
                onDelete: ReferentialAction.Cascade);
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_Contacts_DeliveryPurchases_DeliveryPurchaseDeliveryId_DeliveryPurchasePurchaseId",
                table: "Contacts");

            migrationBuilder.DropIndex(
                name: "IX_Contacts_DeliveryPurchaseDeliveryId_DeliveryPurchasePurchaseId",
                table: "Contacts");

            migrationBuilder.DropColumn(
                name: "DeliveryPurchaseDeliveryId",
                table: "Contacts");

            migrationBuilder.RenameColumn(
                name: "DeliveryPurchasePurchaseId",
                table: "Contacts",
                newName: "PurchaseId");

            migrationBuilder.CreateIndex(
                name: "IX_Contacts_PurchaseId",
                table: "Contacts",
                column: "PurchaseId");

            migrationBuilder.AddForeignKey(
                name: "FK_Contacts_Purchases_PurchaseId",
                table: "Contacts",
                column: "PurchaseId",
                principalTable: "Purchases",
                principalColumn: "Id",
                onDelete: ReferentialAction.Restrict);
        }
    }
}
