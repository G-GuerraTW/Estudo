using Domain.entities;
using Microsoft.EntityFrameworkCore;

namespace Persistence.Configurations
{
    public class EventoConfiguration : IEntityTypeConfiguration<Evento>
    {
        public void Configure(Microsoft.EntityFrameworkCore.Metadata.Builders.EntityTypeBuilder<Evento> builder)
        {
            builder.ToTable("Evento");
            builder.HasKey(E => E.Id);
            builder.Property(E => E.Local).HasColumnType("VARCHAR(200)");
            builder.Property(E => E.Tema).HasColumnType("VARCHAR(200)");
            builder.Property(E => E.DataEvento).HasColumnType("DATETIME()");
            builder.Property(E => E.QtdPessoas).HasColumnType("INT(4)");
            builder.Property(E => E.ImagemURL).HasColumnType("VARCHAR(400)");
            builder.Property(E => E.Telefone).HasColumnType("VARCHAR(20)");
            builder.Property(E => E.Email).HasColumnType("VARCHAR(100)");

            builder.HasMany(E => E.Lotes)
                .WithOne(L => L.Evento)
                .HasForeignKey(L => L.EventoId)
                .IsRequired(false)
                .OnDelete(DeleteBehavior.Cascade);

            builder.HasMany(E => E.RedesSociais)
                .WithOne(R => R.Evento)
                .HasForeignKey(R => R.EventoId)
                .IsRequired(false)
                .OnDelete(DeleteBehavior.Cascade);

            builder.HasMany(E => E.EventosPalestrantes)
                .WithOne(EP => EP.Evento)
                .HasForeignKey(EP => EP.EventoId)
                .IsRequired(false)
                .OnDelete(DeleteBehavior.Cascade);
        }
    }
}