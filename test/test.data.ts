import * as uuid from 'uuid';

export const getTestManifests = () => {
  return JSON.parse(
    '[\n' +
      '  {\n' +
      '    "id": "' +
      uuid.v1() +
      '",\n' +
      '    "facilityCode": 12618,\n' +
      '    "facilityName": "Mwala Hospital",\n' +
      '    "docket": "HTS",\n' +
      '    "logDate": "2019-08-01",\n' +
      '    "buildDate": "2019-08-01",\n' +
      '    "patientCount": 40,\n' +
      '    "cargo": {"EmrName":"Demo EMR","EmrVersion":"v1.0.0.0","LastLoginDate":"1983-07-04T00:00:00","LastMoH731RunDate":"1983-07-04T00:00:00","DateExtracted":"2019-12-03T14:49:01.703992","Id":"0f78f8fe-6396-4bf1-91da-ab1800c2bd90"},\n' +
      '    "isCurrent": true\n' +
      '  },\n' +
      '  {\n' +
      '    "id": "' +
      uuid.v1() +
      '",\n' +
      '    "facilityCode": 12618,\n' +
      '    "facilityName": "Mwala Hospital",\n' +
      '    "docket": "NDWH",\n' +
      '    "logDate": "2019-08-02",\n' +
      '    "buildDate": "2019-08-02",\n' +
      '    "patientCount": 40,\n' +
      '    "cargo": {"EmrName":"Demo EMR","EmrVersion":"v1.0.0.0","LastLoginDate":"1983-07-04T00:00:00","LastMoH731RunDate":"1983-07-04T00:00:00","DateExtracted":"2019-12-03T14:49:01.703992","Id":"0f78f8fe-6396-4bf1-91da-ab1800c2bd90"},\n' +
      '    "isCurrent": false\n' +
      '  },\n' +
      '  {\n' +
      '    "id": "' +
      uuid.v1() +
      '",\n' +
      '    "facilityCode": 14950,\n' +
      '    "facilityName": "Kitengela Health Centre",\n' +
      '    "docket": "NDWH",\n' +
      '    "logDate": "2019-08-02",\n' +
      '    "buildDate": "2019-08-02",\n' +
      '    "patientCount": 50,\n' +
      '    "cargo": {"EmrName":"Demo EMR","EmrVersion":"v1.0.0.0","LastLoginDate":"1983-07-04T00:00:00","LastMoH731RunDate":"1983-07-04T00:00:00","DateExtracted":"2019-12-03T14:49:01.703992","Id":"0f78f8fe-6396-4bf1-91da-ab1800c2bd90"},\n' +
      '    "isCurrent": true\n' +
      '  },\n' +
      '  {\n' +
      '    "id": "' +
      uuid.v1() +
      '",\n' +
      '    "facilityCode": 14950,\n' +
      '    "facilityName": "Kitengela Health Centre",\n' +
      '    "docket": "HTS",\n' +
      '    "logDate": "2019-08-01",\n' +
      '    "buildDate": "2019-08-01",\n' +
      '    "patientCount": 50,\n' +
      '    "cargo": {"EmrName":"Demo EMR","EmrVersion":"v1.0.0.0","LastLoginDate":"1983-07-04T00:00:00","LastMoH731RunDate":"1983-07-04T00:00:00","DateExtracted":"2019-12-03T14:49:01.703992","Id":"0f78f8fe-6396-4bf1-91da-ab1800c2bd90"},\n' +
      '    "isCurrent": false\n' +
      '  }\n' +
      ']',
  );
};

export const getTestStats = () => {
  return JSON.parse(
    '[{\n' +
      '          "facilityCode" : 12618,\n' +
      '          "docket" : {\n' +
      '              "name" : "HTS"},\n' +
      '          "stats" : [\n' +
      '            { "name": "HtsClientExtract", "recieved": 25 },\n' +
      '            { "name": "HtsClientTestsExtract", "recieved": 57 },\n' +
      '            { "name": "HtsClientLinkageExtract", "recieved": 25 },\n' +
      '            { "name": "HtsTestKitsExtract", "recieved": 124 },\n' +
      '            { "name": "HtsClientTracingExtract", "recieved": 13 },\n' +
      '            { "name": "HtsPartnerTracingExtract", "recieved": 1 },\n' +
      '            { "name": "HtsPartnerNotificationServicesExtract", "recieved": 89 }\n' +
      '          ],\n' +
      '          "updated": "2019-08-01"\n' +
      '      },\n' +
      '      {\n' +
      '          "facilityCode" : 14950,\n' +
      '          "docket" : {\n' +
      '              "name" : "HTS"},\n' +
      '          "stats" : [\n' +
      '            { "name": "HtsClientExtract", "recieved": 253 },\n' +
      '            { "name": "HtsClientTestsExtract", "recieved": 517 },\n' +
      '            { "name": "HtsClientLinkageExtract", "recieved": 225 },\n' +
      '            { "name": "HtsTestKitsExtract", "recieved": 1324 },\n' +
      '            { "name": "HtsClientTracingExtract", "recieved": 413 },\n' +
      '            { "name": "HtsPartnerTracingExtract", "recieved": 14 },\n' +
      '            { "name": "HtsPartnerNotificationServicesExtract", "recieved": 289 }\n' +
      '          ],\n' +
      '          "updated": "2019-08-01"\n' +
      '      }\n' +
      '      ]',
  );
};
