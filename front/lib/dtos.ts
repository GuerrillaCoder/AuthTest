/* Options:
Date: 2025-03-26 10:26:32
Version: 8.61
Tip: To override a DTO option, remove "//" prefix before updating
BaseUrl: http://api.geniescraper.com

//GlobalNamespace: 
//MakePropertiesOptional: False
//AddServiceStackTypes: True
//AddResponseStatus: False
//AddImplicitVersion: 
//AddDescriptionAsComments: True
//IncludeTypes: 
//ExcludeTypes: 
//DefaultImports: 
*/


export interface IReturn<T>
{
    createResponse(): T;
}

export interface IReturnVoid
{
    createResponse(): void;
}

export interface IHasSessionId
{
    sessionId?: string;
}

export interface IHasBearerToken
{
    bearerToken?: string;
}

export interface IGet
{
}

export interface ICreateDb<Table>
{
}

export interface IPost
{
}

export interface IPatchDb<Table>
{
}

export interface IDeleteDb<Table>
{
}

export enum SchemaFieldType
{
    String = 'String',
    Number = 'Number',
    Integer = 'Integer',
    Boolean = 'Boolean',
    Array = 'Array',
    Object = 'Object',
    Enum = 'Enum',
    AnyOf = 'AnyOf',
}

export class StringFieldOptions
{
    public minLength?: number;
    public maxLength?: number;

    public constructor(init?: Partial<StringFieldOptions>) { (Object as any).assign(this, init); }
}

export class NumberFieldOptions
{
    public minimum?: number;
    public maximum?: number;
    public exclusiveMinimum: boolean;
    public exclusiveMaximum: boolean;
    public multipleOf?: number;

    public constructor(init?: Partial<NumberFieldOptions>) { (Object as any).assign(this, init); }
}

export class IntegerFieldOptions
{
    public minimum?: number;
    public maximum?: number;
    public exclusiveMinimum: boolean;
    public exclusiveMaximum: boolean;
    public multipleOf?: number;

    public constructor(init?: Partial<IntegerFieldOptions>) { (Object as any).assign(this, init); }
}

export class ArrayFieldOptions
{
    public items: SchemaField;
    public minItems?: number;
    public maxItems?: number;
    public uniqueItems: boolean;

    public constructor(init?: Partial<ArrayFieldOptions>) { (Object as any).assign(this, init); }
}

export class ObjectFieldOptions
{
    public fields: SchemaField[] = [];

    public constructor(init?: Partial<ObjectFieldOptions>) { (Object as any).assign(this, init); }
}

export class EnumFieldOptions
{
    public enumValues: string[] = [];

    public constructor(init?: Partial<EnumFieldOptions>) { (Object as any).assign(this, init); }
}

export class AnyOfFieldOptions
{
    public schemas: SchemaField[] = [];

    public constructor(init?: Partial<AnyOfFieldOptions>) { (Object as any).assign(this, init); }
}

export class SchemaField
{
    public name: string;
    public description: string;
    public isOptional: boolean;
    public type: SchemaFieldType;
    public stringOptions?: StringFieldOptions;
    public numberOptions?: NumberFieldOptions;
    public integerOptions?: IntegerFieldOptions;
    public arrayOptions?: ArrayFieldOptions;
    public objectOptions?: ObjectFieldOptions;
    public enumOptions?: EnumFieldOptions;
    public anyOfOptions?: AnyOfFieldOptions;

    public constructor(init?: Partial<SchemaField>) { (Object as any).assign(this, init); }
}

export class ApiSchemaObject
{
    public id?: string;
    public name: string;
    public description?: string;
    public projectId: string;
    public fields: SchemaField[] = [];

    public constructor(init?: Partial<ApiSchemaObject>) { (Object as any).assign(this, init); }
}

// @DataContract
export class AuditBase
{
    // @DataMember(Order=1)
    public createdDate: string;

    // @DataMember(Order=2)
    // @Required()
    public createdBy: string;

    // @DataMember(Order=3)
    public modifiedDate: string;

    // @DataMember(Order=4)
    // @Required()
    public modifiedBy: string;

    // @DataMember(Order=5)
    public deletedDate?: string;

    // @DataMember(Order=6)
    public deletedBy: string;

    public constructor(init?: Partial<AuditBase>) { (Object as any).assign(this, init); }
}

// @DataContract
export class OpenAiJsonSchemaField
{
    // @DataMember
    public name: string;

    // @DataMember
    public description: string;

    // @DataMember
    public isOptional: boolean;

    public constructor(init?: Partial<OpenAiJsonSchemaField>) { (Object as any).assign(this, init); }
}

// @DataContract
export class OpenAiJsonSchema extends AuditBase
{
    // @DataMember
    public projectId: string;

    // @DataMember
    public name: string;

    // @DataMember
    public description: string;

    // @DataMember
    public fields: OpenAiJsonSchemaField[] = [];

    public constructor(init?: Partial<OpenAiJsonSchema>) { super(init); (Object as any).assign(this, init); }
}

// @DataContract
export class QueryBase
{
    // @DataMember(Order=1)
    public skip?: number;

    // @DataMember(Order=2)
    public take?: number;

    // @DataMember(Order=3)
    public orderBy: string;

    // @DataMember(Order=4)
    public orderByDesc: string;

    // @DataMember(Order=5)
    public include: string;

    // @DataMember(Order=6)
    public fields: string;

    // @DataMember(Order=7)
    public meta: { [index:string]: string; };

    public constructor(init?: Partial<QueryBase>) { (Object as any).assign(this, init); }
}

export class QueryDb<T> extends QueryBase
{

    public constructor(init?: Partial<QueryDb<T>>) { super(init); (Object as any).assign(this, init); }
}

export class IdentityUser_1<TKey>
{
    public id: TKey;
    public userName?: string;
    public normalizedUserName?: string;
    public email?: string;
    public normalizedEmail?: string;
    public emailConfirmed: boolean;
    public passwordHash?: string;
    public securityStamp?: string;
    public concurrencyStamp?: string;
    public phoneNumber?: string;
    public phoneNumberConfirmed: boolean;
    public twoFactorEnabled: boolean;
    public lockoutEnd?: string;
    public lockoutEnabled: boolean;
    public accessFailedCount: number;

    public constructor(init?: Partial<IdentityUser_1<TKey>>) { (Object as any).assign(this, init); }
}

export class IdentityUser extends IdentityUser_1<string>
{

    public constructor(init?: Partial<IdentityUser>) { super(init); (Object as any).assign(this, init); }
}

export class ApplicationUser extends IdentityUser
{
    public firstName?: string;
    public lastName?: string;
    public displayName?: string;
    public profileUrl?: string;
    public facebookUserId?: string;
    public googleUserId?: string;
    public googleProfilePageUrl?: string;
    public microsoftUserId?: string;
    public createdDate?: string;
    public createdBy?: string;
    public modifiedDate?: string;
    public modifiedBy?: string;
    public deletedDate?: string;
    public deletedBy?: string;
    public permissions: string[] = [];

    public constructor(init?: Partial<ApplicationUser>) { super(init); (Object as any).assign(this, init); }
}

export enum UrlScrapeStatus
{
    Pending = 'Pending',
    InProgress = 'InProgress',
    Completed = 'Completed',
    Error = 'Error',
    PendingRetry = 'PendingRetry',
}

export class UrlScrapeResult
{
    public id: number;
    public taskHtmlScrapeId: number;
    public uniqueHostId: number;
    public redirectedUniqueHostId?: number;
    public url: string;
    public redirectUrl?: string;
    public html?: string;
    public readableHtml?: string;
    public markdown?: string;
    public title?: string;
    public description?: string;
    public text?: string;
    public created: string;
    public updated: string;
    public isError: boolean;
    public errorMessage?: string;
    public errorData?: Object;
    public countryCode?: string;
    public httpStatusCode: HttpStatusCode;
    public fancyScrape: boolean;
    public retryCount: number;
    public nextRetry?: string;
    public status: UrlScrapeStatus;
    public nodeName?: string;
    public isHomepage: boolean;

    public constructor(init?: Partial<UrlScrapeResult>) { (Object as any).assign(this, init); }
}

export class Country
{
    public code: string;
    public name: string;

    public constructor(init?: Partial<Country>) { (Object as any).assign(this, init); }
}

export class SearchArea
{
    public id: number;
    public projectId: string;
    public name: string;
    public state: string;
    public population: number;
    public parentId?: number;
    public country: Country;

    public constructor(init?: Partial<SearchArea>) { (Object as any).assign(this, init); }
}

export class Project extends AuditBase
{
    public id: string;
    public workspaceId: string;
    public name: string;
    public description?: string;
    public schemas: OpenAiJsonSchema[] = [];
    public searchAreas: SearchArea[] = [];

    public constructor(init?: Partial<Project>) { super(init); (Object as any).assign(this, init); }
}

export class WorkspaceApplicationUser extends AuditBase
{
    public id: number;
    // @Required()
    public workspaceId: string;

    // @Required()
    public applicationUserId: string;

    public constructor(init?: Partial<WorkspaceApplicationUser>) { super(init); (Object as any).assign(this, init); }
}

export class Workspace extends AuditBase
{
    public id: string;
    public projects: Project[] = [];
    public workspaceApplicationUsers: WorkspaceApplicationUser[] = [];

    public constructor(init?: Partial<Workspace>) { super(init); (Object as any).assign(this, init); }
}

export class UniqueHost extends AuditBase
{
    public id: string;
    public host: string;
    public usesWww: boolean;
    public ssl: boolean;
    public countryCode: string;
    public country: Country;
    public nicheKeywordId: string;
    public projectId: string;

    public constructor(init?: Partial<UniqueHost>) { super(init); (Object as any).assign(this, init); }
}

export class NicheKeyword extends AuditBase
{
    public id: string;
    public projectId: string;
    public keyword: string;

    public constructor(init?: Partial<NicheKeyword>) { super(init); (Object as any).assign(this, init); }
}

// @DataContract
export class ResponseError
{
    // @DataMember(Order=1)
    public errorCode: string;

    // @DataMember(Order=2)
    public fieldName: string;

    // @DataMember(Order=3)
    public message: string;

    // @DataMember(Order=4)
    public meta: { [index:string]: string; };

    public constructor(init?: Partial<ResponseError>) { (Object as any).assign(this, init); }
}

// @DataContract
export class ResponseStatus
{
    // @DataMember(Order=1)
    public errorCode: string;

    // @DataMember(Order=2)
    public message: string;

    // @DataMember(Order=3)
    public stackTrace: string;

    // @DataMember(Order=4)
    public errors: ResponseError[];

    // @DataMember(Order=5)
    public meta: { [index:string]: string; };

    public constructor(init?: Partial<ResponseStatus>) { (Object as any).assign(this, init); }
}

// @DataContract
export class QueryResponse<T>
{
    // @DataMember(Order=1)
    public offset: number;

    // @DataMember(Order=2)
    public total: number;

    // @DataMember(Order=3)
    public results: T[];

    // @DataMember(Order=4)
    public meta: { [index:string]: string; };

    // @DataMember(Order=5)
    public responseStatus: ResponseStatus;

    public constructor(init?: Partial<QueryResponse<T>>) { (Object as any).assign(this, init); }
}

export class HelloResponse
{
    public result: string;

    public constructor(init?: Partial<HelloResponse>) { (Object as any).assign(this, init); }
}

export class SchemaResponse
{
    public schema: ApiSchemaObject;

    public constructor(init?: Partial<SchemaResponse>) { (Object as any).assign(this, init); }
}

// @DataContract
export class AuthenticateResponse implements IHasSessionId, IHasBearerToken
{
    // @DataMember(Order=1)
    public userId: string;

    // @DataMember(Order=2)
    public sessionId: string;

    // @DataMember(Order=3)
    public userName: string;

    // @DataMember(Order=4)
    public displayName: string;

    // @DataMember(Order=5)
    public referrerUrl: string;

    // @DataMember(Order=6)
    public bearerToken: string;

    // @DataMember(Order=7)
    public refreshToken: string;

    // @DataMember(Order=8)
    public refreshTokenExpiry?: string;

    // @DataMember(Order=9)
    public profileUrl: string;

    // @DataMember(Order=10)
    public roles: string[];

    // @DataMember(Order=11)
    public permissions: string[];

    // @DataMember(Order=12)
    public authProvider: string;

    // @DataMember(Order=13)
    public responseStatus: ResponseStatus;

    // @DataMember(Order=14)
    public meta: { [index:string]: string; };

    public constructor(init?: Partial<AuthenticateResponse>) { (Object as any).assign(this, init); }
}

// @Route("/hello/{Name}")
export class Hello implements IReturn<HelloResponse>, IGet
{
    public name: string;

    public constructor(init?: Partial<Hello>) { (Object as any).assign(this, init); }
    public getTypeName() { return 'Hello'; }
    public getMethod() { return 'GET'; }
    public createResponse() { return new HelloResponse(); }
}

// @ValidateRequest(Validator="IsAuthenticated")
export class CreateSchemaRequest implements IReturn<SchemaResponse>, ICreateDb<OpenAiJsonSchema>
{
    // @Validate(Validator="NotEmpty")
    public schema: ApiSchemaObject;

    public constructor(init?: Partial<CreateSchemaRequest>) { (Object as any).assign(this, init); }
    public getTypeName() { return 'CreateSchemaRequest'; }
    public getMethod() { return 'POST'; }
    public createResponse() { return new SchemaResponse(); }
}

// @Route("/schemas", "GET")
// @ValidateRequest(Validator="IsAuthenticated")
export class QuerySchemas extends QueryDb<OpenAiJsonSchema> implements IReturn<QueryResponse<OpenAiJsonSchema>>
{

    public constructor(init?: Partial<QuerySchemas>) { super(init); (Object as any).assign(this, init); }
    public getTypeName() { return 'QuerySchemas'; }
    public getMethod() { return 'GET'; }
    public createResponse() { return new QueryResponse<OpenAiJsonSchema>(); }
}

export class GetTestSchema implements IReturn<OpenAiJsonSchema>
{

    public constructor(init?: Partial<GetTestSchema>) { (Object as any).assign(this, init); }
    public getTypeName() { return 'GetTestSchema'; }
    public getMethod() { return 'GET'; }
    public createResponse() { return new OpenAiJsonSchema(); }
}

export class PostTestSchema implements IReturn<OpenAiJsonSchema>
{
    public schema: OpenAiJsonSchema;

    public constructor(init?: Partial<PostTestSchema>) { (Object as any).assign(this, init); }
    public getTypeName() { return 'PostTestSchema'; }
    public getMethod() { return 'POST'; }
    public createResponse() { return new OpenAiJsonSchema(); }
}

// @Route("/search-areas/generate", "POST")
export class GenerateSearchAreas implements IReturn<SearchArea[]>
{
    // @Validate(Validator="NotEmpty")
    public projectId: string;

    // @Validate(Validator="NotEmpty")
    public countryCode: string;

    // @Validate(Validator="NotEmpty")
    public minimumPopulation: number;

    // @Validate(Validator="NotEmpty")
    public maximumPopulation: number;

    public constructor(init?: Partial<GenerateSearchAreas>) { (Object as any).assign(this, init); }
    public getTypeName() { return 'GenerateSearchAreas'; }
    public getMethod() { return 'POST'; }
    public createResponse() { return new Array<SearchArea>(); }
}

/** @description Sign In */
// @Route("/auth", "GET,POST")
// @Route("/auth/{provider}", "POST")
// @Api(Description="Sign In")
// @DataContract
export class Authenticate implements IReturn<AuthenticateResponse>, IPost
{
    /** @description AuthProvider, e.g. credentials */
    // @DataMember(Order=1)
    public provider: string;

    // @DataMember(Order=2)
    public userName: string;

    // @DataMember(Order=3)
    public password: string;

    // @DataMember(Order=4)
    public rememberMe?: boolean;

    // @DataMember(Order=5)
    public accessToken: string;

    // @DataMember(Order=6)
    public accessTokenSecret: string;

    // @DataMember(Order=7)
    public returnUrl: string;

    // @DataMember(Order=8)
    public errorView: string;

    // @DataMember(Order=9)
    public meta: { [index:string]: string; };

    public constructor(init?: Partial<Authenticate>) { (Object as any).assign(this, init); }
    public getTypeName() { return 'Authenticate'; }
    public getMethod() { return 'POST'; }
    public createResponse() { return new AuthenticateResponse(); }
}

// @Route("/workspaces", "GET")
// @ValidateRequest(Validator="IsAuthenticated")
export class QueryWorkspaces extends QueryDb<Workspace> implements IReturn<QueryResponse<Workspace>>
{

    public constructor(init?: Partial<QueryWorkspaces>) { super(init); (Object as any).assign(this, init); }
    public getTypeName() { return 'QueryWorkspaces'; }
    public getMethod() { return 'GET'; }
    public createResponse() { return new QueryResponse<Workspace>(); }
}

// @Route("/projects", "GET")
// @ValidateRequest(Validator="IsAuthenticated")
export class QueryProjects extends QueryDb<Project> implements IReturn<QueryResponse<Project>>
{

    public constructor(init?: Partial<QueryProjects>) { super(init); (Object as any).assign(this, init); }
    public getTypeName() { return 'QueryProjects'; }
    public getMethod() { return 'GET'; }
    public createResponse() { return new QueryResponse<Project>(); }
}

// @Route("/users", "GET")
// @ValidateRequest(Validator="IsAuthenticated")
export class QueryUsers extends QueryDb<ApplicationUser> implements IReturn<QueryResponse<ApplicationUser>>
{

    public constructor(init?: Partial<QueryUsers>) { super(init); (Object as any).assign(this, init); }
    public getTypeName() { return 'QueryUsers'; }
    public getMethod() { return 'GET'; }
    public createResponse() { return new QueryResponse<ApplicationUser>(); }
}

// @Route("/url-scrape-results", "GET")
// @ValidateRequest(Validator="IsAuthenticated")
export class QueryUrlScrapeResults extends QueryDb<UrlScrapeResult> implements IReturn<QueryResponse<UrlScrapeResult>>
{
    public id?: number;
    public taskHtmlScrapeId?: number;
    public uniqueHostId?: number;
    public redirectedUniqueHostId?: number;
    public url?: string;
    public redirectUrl?: string;
    public title?: string;
    public isError?: boolean;
    public countryCode?: string;
    public httpStatusCode?: HttpStatusCode;
    public status?: UrlScrapeStatus;
    public nodeName?: string;
    public isHomepage?: boolean;
    public createdAfter?: string;
    public createdBefore?: string;
    public minRetryCount?: number;
    public maxRetryCount?: number;

    public constructor(init?: Partial<QueryUrlScrapeResults>) { super(init); (Object as any).assign(this, init); }
    public getTypeName() { return 'QueryUrlScrapeResults'; }
    public getMethod() { return 'GET'; }
    public createResponse() { return new QueryResponse<UrlScrapeResult>(); }
}

// @Route("/unique-hosts", "GET")
// @ValidateRequest(Validator="IsAuthenticated")
export class QueryUniqueHosts extends QueryDb<UniqueHost> implements IReturn<QueryResponse<UniqueHost>>
{
    public id?: string;
    public host?: string;
    public nicheKeywordId?: string;
    public projectId?: string;
    public countryCode?: string;
    public country?: Country;

    public constructor(init?: Partial<QueryUniqueHosts>) { super(init); (Object as any).assign(this, init); }
    public getTypeName() { return 'QueryUniqueHosts'; }
    public getMethod() { return 'GET'; }
    public createResponse() { return new QueryResponse<UniqueHost>(); }
}

// @Route("/niche-keywords", "GET")
// @ValidateRequest(Validator="IsAuthenticated")
export class QueryNicheKeywords extends QueryDb<NicheKeyword> implements IReturn<QueryResponse<NicheKeyword>>
{
    public id?: string;
    public projectId?: string;

    public constructor(init?: Partial<QueryNicheKeywords>) { super(init); (Object as any).assign(this, init); }
    public getTypeName() { return 'QueryNicheKeywords'; }
    public getMethod() { return 'GET'; }
    public createResponse() { return new QueryResponse<NicheKeyword>(); }
}

// @Route("/search-areas", "GET")
export class QuerySearchAreas extends QueryDb<SearchArea> implements IReturn<QueryResponse<SearchArea>>
{
    public projectId: string;
    public parentId?: number;

    public constructor(init?: Partial<QuerySearchAreas>) { super(init); (Object as any).assign(this, init); }
    public getTypeName() { return 'QuerySearchAreas'; }
    public getMethod() { return 'GET'; }
    public createResponse() { return new QueryResponse<SearchArea>(); }
}

// @ValidateRequest(Validator="IsAuthenticated")
export class CreateProjectRequest implements IReturn<Project>, ICreateDb<Project>
{
    public workspaceId: string;
    public name: string;
    public description?: string;

    public constructor(init?: Partial<CreateProjectRequest>) { (Object as any).assign(this, init); }
    public getTypeName() { return 'CreateProjectRequest'; }
    public getMethod() { return 'POST'; }
    public createResponse() { return new Project(); }
}

// @ValidateRequest(Validator="IsAuthenticated")
export class UpdateProjectRequest implements IReturn<Project>, IPatchDb<Project>
{
    public id: string;
    public name?: string;
    public description?: string;

    public constructor(init?: Partial<UpdateProjectRequest>) { (Object as any).assign(this, init); }
    public getTypeName() { return 'UpdateProjectRequest'; }
    public getMethod() { return 'PATCH'; }
    public createResponse() { return new Project(); }
}

// @ValidateRequest(Validator="IsAuthenticated")
export class DeleteProjectRequest implements IReturnVoid, IDeleteDb<Project>
{
    public id: string;

    public constructor(init?: Partial<DeleteProjectRequest>) { (Object as any).assign(this, init); }
    public getTypeName() { return 'DeleteProjectRequest'; }
    public getMethod() { return 'DELETE'; }
    public createResponse() {}
}

// @ValidateRequest(Validator="IsAuthenticated")
export class CreateWorkspaceRequest implements IReturn<Workspace>, ICreateDb<Workspace>
{
    public applicationUserId: string;

    public constructor(init?: Partial<CreateWorkspaceRequest>) { (Object as any).assign(this, init); }
    public getTypeName() { return 'CreateWorkspaceRequest'; }
    public getMethod() { return 'POST'; }
    public createResponse() { return new Workspace(); }
}

// @ValidateRequest(Validator="IsAuthenticated")
export class DeleteWorkspaceRequest implements IReturnVoid, IDeleteDb<Workspace>
{
    public id: string;

    public constructor(init?: Partial<DeleteWorkspaceRequest>) { (Object as any).assign(this, init); }
    public getTypeName() { return 'DeleteWorkspaceRequest'; }
    public getMethod() { return 'DELETE'; }
    public createResponse() {}
}

// @ValidateRequest(Validator="IsAuthenticated")
export class CreateUniqueHostRequest implements IReturn<UniqueHost>, ICreateDb<UniqueHost>
{
    public host: string;
    public usesWww: boolean;
    public ssl: boolean;
    public countryCode: string;
    public country: Country;
    public nicheKeywordId: string;
    public projectId: string;

    public constructor(init?: Partial<CreateUniqueHostRequest>) { (Object as any).assign(this, init); }
    public getTypeName() { return 'CreateUniqueHostRequest'; }
    public getMethod() { return 'POST'; }
    public createResponse() { return new UniqueHost(); }
}

// @ValidateRequest(Validator="IsAuthenticated")
export class UpdateUniqueHostRequest implements IReturn<UniqueHost>, IPatchDb<UniqueHost>
{
    public id: string;
    public host?: string;
    public usesWww?: boolean;
    public ssl?: boolean;
    public countryCode?: string;
    public country?: Country;

    public constructor(init?: Partial<UpdateUniqueHostRequest>) { (Object as any).assign(this, init); }
    public getTypeName() { return 'UpdateUniqueHostRequest'; }
    public getMethod() { return 'PATCH'; }
    public createResponse() { return new UniqueHost(); }
}

// @ValidateRequest(Validator="IsAuthenticated")
export class DeleteUniqueHostRequest implements IReturnVoid, IDeleteDb<UniqueHost>
{
    public id: string;

    public constructor(init?: Partial<DeleteUniqueHostRequest>) { (Object as any).assign(this, init); }
    public getTypeName() { return 'DeleteUniqueHostRequest'; }
    public getMethod() { return 'DELETE'; }
    public createResponse() {}
}

// @ValidateRequest(Validator="IsAuthenticated")
export class UpdateSchemaRequest implements IReturn<OpenAiJsonSchema>, IPatchDb<OpenAiJsonSchema>
{
    public id: string;
    public name?: string;
    public description?: string;
    public projectId?: string;
    public fields?: OpenAiJsonSchemaField[];

    public constructor(init?: Partial<UpdateSchemaRequest>) { (Object as any).assign(this, init); }
    public getTypeName() { return 'UpdateSchemaRequest'; }
    public getMethod() { return 'PATCH'; }
    public createResponse() { return new OpenAiJsonSchema(); }
}

// @ValidateRequest(Validator="IsAuthenticated")
export class CreateNicheKeywordRequest implements IReturn<NicheKeyword>, ICreateDb<NicheKeyword>
{
    public projectId: string;
    public keyword: string;

    public constructor(init?: Partial<CreateNicheKeywordRequest>) { (Object as any).assign(this, init); }
    public getTypeName() { return 'CreateNicheKeywordRequest'; }
    public getMethod() { return 'POST'; }
    public createResponse() { return new NicheKeyword(); }
}

// @ValidateRequest(Validator="IsAuthenticated")
export class DeleteNicheKeywordRequest implements IReturnVoid, IDeleteDb<NicheKeyword>
{
    public id: string;

    public constructor(init?: Partial<DeleteNicheKeywordRequest>) { (Object as any).assign(this, init); }
    public getTypeName() { return 'DeleteNicheKeywordRequest'; }
    public getMethod() { return 'DELETE'; }
    public createResponse() {}
}

