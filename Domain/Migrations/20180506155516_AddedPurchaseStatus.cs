using Microsoft.EntityFrameworkCore.Migrations;
using System;
using System.Collections.Generic;

namespace Domain.Migrations
{
    public partial class AddedPurchaseStatus : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_Contacts_DeliveryPurchases_DeliveryPurchaseDeliveryId_DeliveryPurchasePurchaseId",
                table: "Contacts");

            migrationBuilder.DropForeignKey(
                name: "FK_DeliveryPurchases_Deliveries_DeliveryId",
                table: "DeliveryPurchases");

            migrationBuilder.DropForeignKey(
                name: "FK_DeliveryPurchases_Purchases_PurchaseId",
                table: "DeliveryPurchases");

            migrationBuilder.DropPrimaryKey(
                name: "PK_DeliveryPurchases",
                table: "DeliveryPurchases");

            migrationBuilder.DropIndex(
                name: "IX_Contacts_DeliveryPurchaseDeliveryId_DeliveryPurchasePurchaseId",
                table: "Contacts");

            migrationBuilder.DropColumn(
                name: "DeliveryPurchaseDeliveryId",
                table: "Contacts");

            migrationBuilder.RenameColumn(
                name: "DeliveryPurchasePurchaseId",
                table: "Contacts",
                newName: "DeliveryPurchaseId");

            migrationBuilder.AddColumn<int>(
                name: "Status",
                table: "Purchases",
                nullable: false,
                defaultValue: 0);

            migrationBuilder.AlterColumn<Guid>(
                name: "PurchaseId",
                table: "DeliveryPurchases",
                nullable: true,
                oldClrType: typeof(Guid));

            migrationBuilder.AlterColumn<Guid>(
                name: "DeliveryId",
                table: "DeliveryPurchases",
                nullable: true,
                oldClrType: typeof(Guid));

            migrationBuilder.AddColumn<Guid>(
                name: "DeliveryPurchaseId",
                table: "DeliveryPurchases",
                nullable: false,
                defaultValue: new Guid("00000000-0000-0000-0000-000000000000"));

            migrationBuilder.AddPrimaryKey(
                name: "PK_DeliveryPurchases",
                table: "DeliveryPurchases",
                column: "DeliveryPurchaseId");

            migrationBuilder.CreateIndex(
                name: "IX_DeliveryPurchases_DeliveryId",
                table: "DeliveryPurchases",
                column: "DeliveryId");

            migrationBuilder.CreateIndex(
                name: "IX_Contacts_DeliveryPurchaseId",
                table: "Contacts",
                column: "DeliveryPurchaseId");

            migrationBuilder.AddForeignKey(
                name: "FK_Contacts_DeliveryPurchases_DeliveryPurchaseId",
                table: "Contacts",
                column: "DeliveryPurchaseId",
                principalTable: "DeliveryPurchases",
                principalColumn: "DeliveryPurchaseId",
                onDelete: ReferentialAction.Cascade);

            migrationBuilder.AddForeignKey(
                name: "FK_DeliveryPurchases_Deliveries_DeliveryId",
                table: "DeliveryPurchases",
                column: "DeliveryId",
                principalTable: "Deliveries",
                principalColumn: "Id",
                onDelete: ReferentialAction.Restrict);

            migrationBuilder.AddForeignKey(
                name: "FK_DeliveryPurchases_Purchases_PurchaseId",
                table: "DeliveryPurchases",
                column: "PurchaseId",
                principalTable: "Purchases",
                principalColumn: "Id",
                onDelete: ReferentialAction.Restrict);
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_Contacts_DeliveryPurchases_DeliveryPurchaseId",
                table: "Contacts");

            migrationBuilder.DropForeignKey(
                name: "FK_DeliveryPurchases_Deliveries_DeliveryId",
                table: "DeliveryPurchases");

            migrationBuilder.DropForeignKey(
                name: "FK_DeliveryPurchases_Purchases_PurchaseId",
                table: "DeliveryPurchases");

            migrationBuilder.DropPrimaryKey(
                name: "PK_DeliveryPurchases",
                table: "DeliveryPurchases");

            migrationBuilder.DropIndex(
                name: "IX_DeliveryPurchases_DeliveryId",
                table: "DeliveryPurchases");

            migrationBuilder.DropIndex(
                name: "IX_Contacts_DeliveryPurchaseId",
                table: "Contacts");

            migrationBuilder.DropColumn(
                name: "Status",
                table: "Purchases");

            migrationBuilder.DropColumn(
                name: "DeliveryPurchaseId",
                table: "DeliveryPurchases");

            migrationBuilder.RenameColumn(
                name: "DeliveryPurchaseId",
                table: "Contacts",
                newName: "DeliveryPurchasePurchaseId");

            migrationBuilder.AlterColumn<Guid>(
                name: "PurchaseId",
                table: "DeliveryPurchases",
                nullable: false,
                oldClrType: typeof(Guid),
                oldNullable: true);

            migrationBuilder.AlterColumn<Guid>(
                name: "DeliveryId",
                table: "DeliveryPurchases",
                nullable: false,
                oldClrType: typeof(Guid),
                oldNullable: true);

            migrationBuilder.AddColumn<Guid>(
                name: "DeliveryPurchaseDeliveryId",
                table: "Contacts",
                nullable: true);

            migrationBuilder.AddPrimaryKey(
                name: "PK_DeliveryPurchases",
                table: "DeliveryPurchases",
                columns: new[] { "DeliveryId", "PurchaseId" });

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

            migrationBuilder.AddForeignKey(
                name: "FK_DeliveryPurchases_Deliveries_DeliveryId",
                table: "DeliveryPurchases",
                column: "DeliveryId",
                principalTable: "Deliveries",
                principalColumn: "Id",
                onDelete: ReferentialAction.Cascade);

            migrationBuilder.AddForeignKey(
                name: "FK_DeliveryPurchases_Purchases_PurchaseId",
                table: "DeliveryPurchases",
                column: "PurchaseId",
                principalTable: "Purchases",
                principalColumn: "Id",
                onDelete: ReferentialAction.Cascade);
        }
    }
}
