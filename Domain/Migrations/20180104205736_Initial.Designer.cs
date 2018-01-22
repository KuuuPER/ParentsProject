﻿// <auto-generated />
using Domain.Contexts;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Infrastructure;
using Microsoft.EntityFrameworkCore.Metadata;
using Microsoft.EntityFrameworkCore.Migrations;
using System;

namespace Domain.Migrations
{
    [DbContext(typeof(AppDbContext))]
    [Migration("20180104205736_Initial")]
    partial class Initial
    {
        protected override void BuildTargetModel(ModelBuilder modelBuilder)
        {
#pragma warning disable 612, 618
            modelBuilder
                .HasAnnotation("ProductVersion", "2.0.1-rtm-125")
                .HasAnnotation("SqlServer:ValueGenerationStrategy", SqlServerValueGenerationStrategy.IdentityColumn);

            modelBuilder.Entity("Domain.Models.Delivery", b =>
                {
                    b.Property<Guid>("Id")
                        .ValueGeneratedOnAdd();

                    b.Property<DateTime?>("CreatedDate")
                        .ValueGeneratedOnAdd();

                    b.Property<DateTime?>("FinishDate");

                    b.Property<Guid>("ProviderId");

                    b.Property<int>("Status");

                    b.HasKey("Id");

                    b.HasIndex("ProviderId");

                    b.ToTable("Deliveries");
                });

            modelBuilder.Entity("Domain.Models.Manufacture", b =>
                {
                    b.Property<Guid>("Id")
                        .ValueGeneratedOnAdd();

                    b.Property<string>("Country")
                        .IsRequired();

                    b.Property<string>("Name")
                        .IsRequired();

                    b.HasKey("Id");

                    b.ToTable("Manufactures");
                });

            modelBuilder.Entity("Domain.Models.Product", b =>
                {
                    b.Property<Guid>("Id")
                        .ValueGeneratedOnAdd();

                    b.Property<Guid>("CategoryId");

                    b.Property<Guid>("ManufactureId");

                    b.Property<string>("Name")
                        .IsRequired();

                    b.Property<string>("VendorCode")
                        .IsRequired();

                    b.HasKey("Id");

                    b.HasIndex("CategoryId")
                        .IsUnique();

                    b.HasIndex("ManufactureId");

                    b.ToTable("Products");
                });

            modelBuilder.Entity("Domain.Models.ProductCategory", b =>
                {
                    b.Property<Guid>("Id")
                        .ValueGeneratedOnAdd();

                    b.Property<string>("Name")
                        .IsRequired();

                    b.HasKey("Id");

                    b.ToTable("ProductCategories");
                });

            modelBuilder.Entity("Domain.Models.ProductUnit", b =>
                {
                    b.Property<Guid>("Id")
                        .ValueGeneratedOnAdd();

                    b.Property<int>("Count");

                    b.Property<DateTime>("CreatedDate")
                        .ValueGeneratedOnAdd();

                    b.Property<Guid?>("DeliveryId");

                    b.Property<Guid>("ProductId");

                    b.Property<int>("ProviderPrice");

                    b.Property<int>("StorePrice");

                    b.Property<DateTime>("UpdatedDate")
                        .ValueGeneratedOnAddOrUpdate();

                    b.HasKey("Id");

                    b.HasIndex("DeliveryId");

                    b.HasIndex("ProductId")
                        .IsUnique();

                    b.ToTable("ProductUnits");
                });

            modelBuilder.Entity("Domain.Models.Provider", b =>
                {
                    b.Property<Guid>("Id")
                        .ValueGeneratedOnAdd();

                    b.Property<string>("Address")
                        .IsRequired();

                    b.Property<string>("Name")
                        .IsRequired();

                    b.Property<string>("Phone")
                        .IsRequired();

                    b.HasKey("Id");

                    b.ToTable("Providers");
                });

            modelBuilder.Entity("Domain.Models.Delivery", b =>
                {
                    b.HasOne("Domain.Models.Provider", "Provider")
                        .WithMany("Deliveries")
                        .HasForeignKey("ProviderId")
                        .OnDelete(DeleteBehavior.Cascade);
                });

            modelBuilder.Entity("Domain.Models.Product", b =>
                {
                    b.HasOne("Domain.Models.ProductCategory", "Category")
                        .WithOne()
                        .HasForeignKey("Domain.Models.Product", "CategoryId")
                        .OnDelete(DeleteBehavior.Cascade);

                    b.HasOne("Domain.Models.Manufacture", "Manufacture")
                        .WithMany()
                        .HasForeignKey("ManufactureId")
                        .OnDelete(DeleteBehavior.Cascade);
                });

            modelBuilder.Entity("Domain.Models.ProductUnit", b =>
                {
                    b.HasOne("Domain.Models.Delivery")
                        .WithMany("ProductUnits")
                        .HasForeignKey("DeliveryId");

                    b.HasOne("Domain.Models.Product", "Product")
                        .WithOne()
                        .HasForeignKey("Domain.Models.ProductUnit", "ProductId")
                        .OnDelete(DeleteBehavior.Cascade);
                });
#pragma warning restore 612, 618
        }
    }
}
