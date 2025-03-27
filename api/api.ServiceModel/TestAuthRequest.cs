using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using ServiceStack;

namespace api.ServiceModel
{
    [ValidateIsAuthenticated]
    public class TestAuthRequest : IReturn<string>
    {
    }
}
