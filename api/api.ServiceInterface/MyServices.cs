using ServiceStack;
using api.ServiceModel;

namespace api.ServiceInterface;

public class MyServices : Service
{
    public object Any(Hello request)
    {
        return new HelloResponse { Result = $"Hello, {request.Name}!" };
    }

    public string Any(TestAuthRequest request)
    {
        return $"You are authenticated!";
    }
}