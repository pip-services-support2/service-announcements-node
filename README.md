# Announcements Microservice

This is a system announcements microservice from Pip.Services library. 
It allows system administrators and product owners to communicate to users key system events and product updates.
Each announcement:
- Can be written in multiple languages
- Can include pictures and document attachments
- Supports editing lifecycle via status tracking

The microservice currently supports the following deployment options:
* Deployment platforms: Standalone Process, Seneca
* External APIs: HTTP/REST, Seneca, AWS Lambda
* Persistence: In-Memory, Flat Files, MongoDB

This microservice has dependencies on the following microservices:
- [service-attachments](https://github.com/pip-services-content2/service-attachments-node) - to reference pictures and documents associates with announcements

<a name="links"></a> Quick Links:

* [Download Links](doc/Downloads.md)
* [Development Guide](doc/Development.md)
* [Configuration Guide](doc/Configuration.md)
* [Deployment Guide](doc/Deployment.md)
* Client SDKs
  - [Node.js SDK](https://github.com/pip-services-content2/client-announcements-node)
* Communication Protocols
  - [HTTP Version 1](doc/HttpProtocolV1.md)
  - [Seneca Version 1](doc/SenecaProtocolV1.md)

##  Contract

Logical contract of the microservice is presented below. For physical implementation (HTTP/REST, Thrift, Seneca, Lambda, etc.),
please, refer to documentation of the specific protocol.

```typescript
class AnnouncementV1 implements IStringIdentifiable {
    /* Identification */
    public id: string;
    public category: string;
    public app?: string;

    /* Automatically managed fields */
    public creator: PartyReferenceV1;
    public create_time: Date;

    /* Content */
    public title?: MultiString;
    public content?: MultiString;
    public location?: LocationV1;
    public start_time?: Date;
    public end_time?: Date;
    public pic_ids?: string[];
    public docs?: AttachmentV1[];

    /* Search */
    public tags?: string[];
    public all_tags?: string[];

    /* Status */
    public status?: string;
    public importance?: number;

    /* Custom fields */
    public custom_hdr?: any;
    public custom_dat?: any;
}

class AttachmentV1 implements IStringIdentifiable {
    public id: string;
    public name?: string;
}

class PartyReferenceV1 implements IStringIdentifiable {
    public id: string;
    public name?: string;
    public email?: string;
}

class LocationV1 {
    public name: string;
    public pos?: any;
}

class AnnouncementStatusV1 {
    public static readonly New = "new";
    public static readonly Writing = "writing";
    public static readonly Translating = "translating";
    public static readonly Verifying = "verifying";
    public static readonly Completed = "completed";
}

interface IAnnouncementsV1 {
    getAnnouncements(correlationId: string, filter: FilterParams, paging: PagingParams): Promise<DataPage<AnnouncementV1>>;

    getRandomAnnouncement(correlationId: string, filter: FilterParams): Promise<AnnouncementV1>;

    getAnnouncementById(correlationId: string, announcementId: string): Promise<AnnouncementV1>;

    createAnnouncement(correlationId: string, announcement: AnnouncementV1): Promise<AnnouncementV1>;

    updateAnnouncement(correlationId: string, announcement: AnnouncementV1): Promise<AnnouncementV1>;

    deleteAnnouncementById(correlationId: string, announcementId: string): Promise<AnnouncementV1>;
}
```

## Download

Right now the only way to get the microservice is to check it out directly from github repository
```bash
git clone git@github.com:pip-services-support2/service-announcements-node.git
```

Pip.Service team is working to implement packaging and make stable releases available for your 
as zip downloadable archieves.

## Run

Add **config.yml** file to the root of the microservice folder and set configuration parameters.
As the starting point you can use example configuration from **config.example.yml** file. 

Example of microservice configuration
```yaml
---
- descriptor: "pip-services-commons:logger:console:default:1.0"
  level: "trace"

- descriptor: "service-announcements:persistence:file:default:1.0"
  path: "./data/announcements.json"

- descriptor: "service-announcements:controller:default:default:1.0"

- descriptor: "service-attachments:client:commandable-http:default:1.0"
  connection:
    protocol: "http"
    host: "0.0.0.0"
    port: 8082

- descriptor: "service-announcements:service:commandable-http:default:1.0"
  connection:
    protocol: "http"
    host: "0.0.0.0"
    port: 8080
```
 
For more information on the microservice configuration see [Configuration Guide](Configuration.md).

Start the microservice using the command:
```bash
node run
```

## Use

The easiest way to work with the microservice is to use client SDK. 
The complete list of available client SDKs for different languages is listed in the [Quick Links](#links)

If you use Node.js then you should add dependency to the client SDK into **package.json** file of your project
```javascript
{
    ...
    "dependencies": {
        ....
        "client-announcements-node": "^1.0.*",
        ...
    }
}
```

Inside your code get the reference to the client SDK
```javascript
let sdk = new require('client-announcements-node');
```

Define client configuration parameters that match configuration of the microservice external API
```javascript
// Client configuration
let config = {
    connection: {
        protocol: 'http',
        host: 'localhost', 
        port: 8080
    }
};
```

Instantiate the client and open connection to the microservice
```javascript
// Create the client instance
let client = sdk.AnnouncementsHttpClientV1(config);

// Connect to the microservice
await client.open(null);

// Work with the microservice
...
```

Now the client is ready to perform operations
```javascript
// Create a new announcement
let announcement = await client.createAnnouncement(
    null,
    { 
        category: 'maintenance',
        title: { en: 'Maintenance on Jan 01' },
        content: { en: 'Our servers will be shutdown for maintenance on Jan 01' }
    }
);
```

```javascript
// Get a random announcement
announcement = await client.getRandomAnnouncement(
    null,
    {}
);
```    

## Acknowledgements

This microservice was created and currently maintained by *Sergey Seroukhov*.

