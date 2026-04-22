import { BASE_API_URL } from '@/utils/constants.js'

/** OpenAPI "info" section content */
export const API_INFO = {
  openapi: '3.0.0',

  info: {
    version: '1.0.0',
    title: 'PH Regions API',
    contact: { name: 'PH Regions', url: 'https://github.com/weaponsforge/ph-regions' },
    license: { name: 'MIT' },

    description: `**💡About** \n\n A RESTful API that serves hierarchical location data of the Philippines — including regions, provinces, municipalities, and a randomly generated number of barangays per municipality for testing purposes. \n\n **⚠️ Important** <br><br> This API is intended for testing and simulating RESTful API requests from client applications. \n **Note:** The location data may be outdated and does not reflect the most current official records. \n\n **🧩 Alternate API Documentation** <ul><li>Scalar: [${BASE_API_URL}](${BASE_API_URL})</li><li>Swagger UI: [${BASE_API_URL}/docs](${BASE_API_URL}/docs)</li><li>Redocly CLI: [${BASE_API_URL}/docs/redoc](${BASE_API_URL}/docs/redoc)</li></ul>`,

    'x-logo': {
      url: '../../assets/images/logo_ph_regions_01.png',
      altText: 'PH Regions logo',
    },
  },
  tags: [
    {
      name: 'Islands',
      description: 'REST APIs for retrieving Philippine islands location data',
    },
    {
      name: 'Regions',
      description: 'REST APIs for retrieving Philippine regional location data',
    },
    {
      name: 'Provinces',
      description: 'REST APIs for retrieving Philippine provincial location data',
    },
    {
      name: 'Municipalities',
      description: 'REST APIs for retrieving Philippine municipal location data',
    },
    {
      name: 'Stats',
      description: 'REST APIs for retrieving random test data for each **Municipality**',
    },
  ],
  'x-tagGroups': [
    {
      name: 'Location',
      tags: ['Islands', 'Regions', 'Provinces', 'Municipalities'],
      description: 'API endpoints for retrieving Philippine location data',
      'x-displayName': 'Location data',
    },
    {
      name: 'Random',
      description: 'API endpoints for retrieving random data with Municipalities',
      tags: ['Stats'],
      'x-displayName': 'Random data',
    },
  ],
  servers: [
    {
      url: BASE_API_URL,
      description: 'Development server',
    },
  ],
}
