# Changelog

All notable changes to this project will be documented in this file.

This project follows [Semantic Versioning](https://semver.org/) and a Keep a Changelog style.

## [0.2.0]

### Added
- `createPlant` now accepts `multipart/form-data` with a binary `attachments` file.
- Swagger documentation for the plant creation payload.
- A reusable Nest pipe to parse JSON fields inside multipart requests.
- Local MongoDB support via `docker-compose.yml`.

### Changed
- Plant payload/schema now includes `plant_id`, `nick_name`, `specie_id`, `created_by`, `location`, `metadata`, `attachments`, `creation_timestamp`, `creation_offset`, and `schema_version`.

## [0.1.0] - 2026-05-23

### Added
- Initial plant API scaffolding.
- Plant DTOs, controller, service, and MongoDB schema.
- Swagger setup for the API.
