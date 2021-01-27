import * as uuid from 'uuid';
import * as fg from 'fast-glob';
import * as fs from 'fs';
import { Logger } from '@nestjs/common';
import { plainToClass } from 'class-transformer';
import { Manifest } from '../src/domain/manifest.entity';

const pattern = '**/*.test.json';
const dockets = ['NDWH', 'HTS', 'MPI', 'MGS'];

const getFiles = async () => {
  let files: string[] = [];
  files = await fg([pattern], { dot: true });
  return files;
};

const addDays = (days: number, date: Date = new Date()): Date => {
  date.setDate(date.getDate() + days);
  return date;
};

export const getManifests = async () => {
  const seedFiles = await getFiles();
  const fileToParse = seedFiles.find((f) =>
    f.includes('manifest'.toLowerCase()),
  );
  if (fileToParse) {
    Logger.log(`reading seed [${fileToParse}]`);
    const contents = fs.readFileSync(fileToParse).toString();
    const data: Manifest[] = JSON.parse(contents);
    dockets.forEach((docket) => {
      data.forEach((m) => {
        m.id = uuid.v1();
        m.docket = docket;
        m.buildDate = m.logDate = addDays(-1);
        m.patientCount = 40;
      });
    });
    return plainToClass(Manifest, data);
  }
  return [];
};

export const getStats = async () => {
  const seedFiles = await getFiles();
  const fileToParse = seedFiles.find((f) => f.includes('stat'.toLowerCase()));
  if (fileToParse) {
    Logger.log(`reading seed [${fileToParse}]`);
    const contents = fs.readFileSync(fileToParse).toString();
    const data: Manifest[] = JSON.parse(contents);
    dockets.forEach((docket) => {
      data.forEach((m) => {
        m.id = uuid.v1();
        m.docket = docket;
        m.buildDate = m.logDate = addDays(-1);
        m.patientCount = 40;
      });
    });
    return plainToClass(Manifest, data);
  }
  return [];
};

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
      '  },\n' +
      '  {\n' +
      '    "id": "' +
      uuid.v1() +
      '",\n' +
      '    "facilityCode": 14950,\n' +
      '    "facilityName": "Kitengela Health Centre",\n' +
      '    "docket": "MGS",\n' +
      '    "logDate": "2019-08-01",\n' +
      '    "buildDate": "2019-08-01",\n' +
      '    "patientCount": 50,\n' +
      '    "cargo": {"EmrName":"Demo EMR","EmrVersion":"v1.0.0.0","LastLoginDate":"1983-07-04T00:00:00","LastMoH731RunDate":"1983-07-04T00:00:00","DateExtracted":"2019-12-03T14:49:01.703992","Id":"0f78f8fe-6396-4bf1-91da-ab1800c2bd90"},\n' +
      '    "isCurrent": false\n' +
      '  },\n' +
      '  {\n' +
      '    "id": "' +
      uuid.v1() +
      '",\n' +
      '    "facilityCode": 14950,\n' +
      '    "facilityName": "Kitengela Health Centre",\n' +
      '    "docket": "MPI",\n' +
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

export const getTestMetrics = () => {
  let facid = uuid.v1();
  return JSON.parse(
    '[\n' +
      '  {\n' +
      '    "id": "' +
      uuid.v1() +
      '",\n' +
      '    "facilityCode": 12618,\n' +
      '    "facilityName": "Mwala Hospital",\n' +
      '    "cargo": {"EmrName":"Demo EMR","EmrVersion":"v1.0.0.0","LastLoginDate":"1983-07-04T00:00:00","LastMoH731RunDate":"1983-07-04T00:00:00","DateExtracted":"2019-12-03T14:49:01.703992","Id":"0f78f8fe-6396-4bf1-91da-ab1800c2bd90"},\n' +
      '    "cargoType": 1,\n' +
      '    "facilityManifestId": "d47cb9a6-1dc2-11ea-978f-2e728ce88125"\n' +
      '  },\n' +
      '  {\n' +
      '    "id": "' +
      uuid.v1() +
      '",\n' +
      '    "facilityCode": 12618,\n' +
      '    "facilityName": "Mwala Hospital",\n' +
      '    "cargo": {"Version": "2.3.9","Name": "MasterPatientIndex","LogDate": "2019-12-13T12:04:07.536592","LogValue": "{\\"Name\\":\\"MasterPatientIndex\\",\\"NoLoaded\\":0,\\"Version\\":\\"2.3.9\\",\\"ActionDate\\":\\"2019-12-13T12:04:07.535936+03:00\\"}","Status": 0,"Display": "Master Patient Index","Action": "Loaded", "Rank": 5,"Id": "b9ae5ec8-bc7f-411e-9ab0-ab22009572d5"},\n' +
      '    "cargoType": 2,\n' +
      '    "facilityManifestId": "d47cb9a6-1dc2-11ea-978f-2e728ce88125"\n' +
      '  }\n' +
      ']',
  );
};

export const getTestIndicators = () => {
  let facid = uuid.v1();
  return JSON.parse(
    '[\n' +
      '  {\n' +
      '    "id": "' +
      uuid.v1() +
      '",\n' +
      '    "facilityCode": 12618,\n' +
      '    "facilityName": "Mwala Hospital",\n' +
      '    "name": "TX_CURR",\n' +
      '    "value": "765",\n' +
      '    "indicatorDate": "2021-01-26T13:33:26.1900597",\n' +
      '    "stage": "EMR",\n' +
      '    "facilityManifestId": "d47cb9a6-1dc2-11ea-978f-2e728ce88125"\n' +
      '  }\n' +
      ']',
  );
};
