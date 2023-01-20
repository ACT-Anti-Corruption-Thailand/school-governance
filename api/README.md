# School Governance API

## Setup

### 1. Create .env file

```
NOCODB_URL=https://sheets.wevis.info
NOCODB_ORG=noco
NOCODB_PROJECT=Open-School-Test
NOCODB_TOKEN=<token>
```

### 2. Run api server in development mode

```
yarn run dev
```

## Endpoints

### GET /

Test endpoint

```
School Governance API is doing OK :)
```

### GET /schools/:schoolId/score

Get score from the given schoolId

```json
{
	"count": 6,
	"rating": 3.03125
}
```
