using Microsoft.AspNetCore.Http;
using Microsoft.EntityFrameworkCore;
using Microsoft.Data.SqlClient;
using System.ComponentModel.DataAnnotations;
using System.Net;
using System.Text.Json;

namespace CourierParcelTrackingSystem.API.Middleware
{
    public class GlobalExceptionMiddleware
    {
        private readonly RequestDelegate _next;
        private readonly ILogger<GlobalExceptionMiddleware> _logger;

        public GlobalExceptionMiddleware(
            RequestDelegate next,
            ILogger<GlobalExceptionMiddleware> logger)
        {
            _next = next;
            _logger = logger;
        }

        public async Task InvokeAsync(HttpContext context)
        {
            try
            {
                await _next(context);
            }
            catch (Exception ex)
            {
                // Log the complete exception
                _logger.LogError(
                    ex,
                    "Unhandled exception occurred. Request: {Method} {Path}",
                    context.Request.Method,
                    context.Request.Path
                );

                await HandleExceptionAsync(context, ex);
            }
        }

        private static async Task HandleExceptionAsync(
            HttpContext context,
            Exception exception)
        {
            context.Response.ContentType = "application/json";

            var statusCode = HttpStatusCode.InternalServerError;
            var message = "An unexpected error occurred.";
            var errors = new List<string>();


            switch (exception)
            {
                // 400  Bad Request
               
                case ArgumentException:
                    statusCode = HttpStatusCode.BadRequest;
                    message = "The request contains invalid data.";
                    errors.Add(exception.Message);
                    break;


                case FormatException:
                    statusCode = HttpStatusCode.BadRequest;
                    message = "The provided data is in an invalid format.";
                    errors.Add(exception.Message);
                    break;


                case ValidationException:
                    statusCode = HttpStatusCode.BadRequest;
                    message = "Validation failed.";
                    errors.Add(exception.Message);
                    break;


                // 401  Unauthorized

                case UnauthorizedAccessException:
                    statusCode = HttpStatusCode.Unauthorized;
                    message = "You are not authorized to perform this operation.";
                    break;


                // 403 Forbidden
                

                case System.Security.SecurityException:
                    statusCode = HttpStatusCode.Forbidden;
                    message = "You do not have permission to perform this operation.";
                    break;


                // 404  Not Found

                case KeyNotFoundException:
                    statusCode = HttpStatusCode.NotFound;
                    message = "The requested resource was not found.";
                    errors.Add(exception.Message);
                    break;


                // 409  Conflict

                case DbUpdateConcurrencyException:
                    statusCode = HttpStatusCode.Conflict;
                    message = "The record was modified by another request.";
                    break;


                
                // SQL  Database Exceptions

                case DbUpdateException dbUpdateException:

                    statusCode = HttpStatusCode.Conflict;
                    message = "The database operation could not be completed.";

                    // Get the underlying SQL exception
                    var sqlException =
                        dbUpdateException.InnerException as SqlException;

                    if (sqlException != null)
                    {
                        switch (sqlException.Number)
                        {
                            // Duplicate key
                            case 2601:
                            case 2627:

                                statusCode = HttpStatusCode.Conflict;

                                message =
                                    "A record with the same information already exists.";

                                break;


                            // Foreign key violation
                            case 547:

                                statusCode = HttpStatusCode.Conflict;

                                message =
                                    "This record cannot be modified because it is being used by another record.";

                                break;


                            // SQL timeout
                            case -2:

                                statusCode =
                                    HttpStatusCode.ServiceUnavailable;

                                message =
                                    "The database operation timed out. Please try again.";

                                break;


                            default:

                                statusCode =
                                    HttpStatusCode.InternalServerError;

                                message =
                                    "A database error occurred.";

                                break;
                        }
                    }

                    break;


                // Direct SQL exception
                case SqlException sqlEx:

                    statusCode =
                        HttpStatusCode.InternalServerError;

                    message =
                        "A database error occurred.";

                    if (sqlEx.Number == 2601 ||
                        sqlEx.Number == 2627)
                    {
                        statusCode =
                            HttpStatusCode.Conflict;

                        message =
                            "A record with the same information already exists.";
                    }
                    else if (sqlEx.Number == 547)
                    {
                        statusCode =
                            HttpStatusCode.Conflict;

                        message =
                            "This operation cannot be completed because the record is being used elsewhere.";
                    }
                    else if (sqlEx.Number == -2)
                    {
                        statusCode =
                            HttpStatusCode.ServiceUnavailable;

                        message =
                            "The database operation timed out. Please try again.";
                    }

                    break;


                // Invalid Operation
                

                case InvalidOperationException:
                    statusCode = HttpStatusCode.BadRequest;
                    message = "The requested operation is invalid.";
                    errors.Add(exception.Message);
                    break;


                // Null Reference

                case NullReferenceException:
                    statusCode = HttpStatusCode.InternalServerError;
                    message = "An internal application error occurred.";
                    break;



                // Default / Unknown Exception

                default:

                    statusCode =
                        HttpStatusCode.InternalServerError;

                    message =
                        "An unexpected error occurred.";

                    break;
            }


            context.Response.StatusCode = (int)statusCode;


            // Remove empty errors
            if (errors.Count == 0)
            {
                errors = null!;
            }


            var response = new
            {
                statusCode = (int)statusCode,
                message,
                errors
            };


            var json = JsonSerializer.Serialize(
                response,
                new JsonSerializerOptions
                {
                    PropertyNamingPolicy =
                        JsonNamingPolicy.CamelCase
                }
            );


            await context.Response.WriteAsync(json);
        }
    }
}