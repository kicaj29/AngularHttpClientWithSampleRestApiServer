using Microsoft.AspNetCore.Http;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace RESTapiServer.ApiErrors
{
    public class BadRequest : ApiError
    {
        public BadRequest(string statusDescription)
            : base(StatusCodes.Status400BadRequest, statusDescription)
        {

        }
    }
}
