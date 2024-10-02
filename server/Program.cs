using Azure.Identity;
using Microsoft.EntityFrameworkCore;
using server.Context;
using server.Static;

var builder = WebApplication.CreateBuilder(args);

builder.Services.AddApplicationServices();
builder.Services.AddControllers();
builder.Services.AddEndpointsApiExplorer();
builder.Services.AddSwaggerGen();

builder.Services.AddCors(options =>
{
    options.AddPolicy("AllowAllOrigins",
        builder =>
        {
            builder.AllowAnyOrigin()
                .AllowAnyMethod()
                .AllowAnyHeader();
        });
});

builder.Configuration.AddAzureKeyVault(
    new Uri($"https://{builder.Configuration["KeyVaultName"]}.vault.azure.net/"),
    new DefaultAzureCredential());

var configuration = builder.Configuration["dbCon"];
builder.Services.AddDbContext<CookinUpDbContext>(
    option => option.UseMySql(configuration, ServerVersion.AutoDetect(configuration))
);

JwtTokenClass.secretKey = builder.Configuration["jwtKey"] ?? builder.Configuration["jwtStaticKey"];

var app = builder.Build();

if (app.Environment.IsDevelopment())
{
    app.UseSwagger();
    app.UseSwaggerUI();
}

app.UseCors("AllowAllOrigins");
app.UseHttpsRedirection();
app.UseAuthorization();
app.MapControllers();
app.Run();