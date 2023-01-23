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

### GET /schools/:schoolId/comments

Get comments from the given schoolId

**Optional query**

- locations: comma-seperated locations
- years: comma-seperated years
- sort: `latest`

**Example**

```json
// GET /schools/1010720003/comments?locations=classroom,toilet

{
	"list": [
		{
			"Id": 1,
			"schoolId": "1010720003",
			"comments": "ทดสอบ",
			"location": "toilet,canteen",
			"schoolYear": "2022",
			"userId": "Ml9Qw6AcBmdbYPxLH5xiPp92SIn2",
			"createDate": "2022-12-20T08:33:18.678Z",
			"likeCount": "2",
			"approved": true,
			"images": "{}",
			"likedUserIds": [
				{
					"Id": 15,
					"userId": "Ml9Qw6AcBmdbYPxLH5xiPp92SIn2"
				},
				{
					"Id": 22,
					"userId": "uFAvzzwvIsTYLVwMkA2ignkhrOz2"
				}
			]
		}
	],
	"pageInfo": {
		"totalRows": 6,
		"page": 1,
		"pageSize": 100,
		"isFirstPage": true,
		"isLastPage": true
	}
}
```

### GET /schools/:schoolId/score

Get score from the given schoolId

**Example**

```json
// GET /schools/1010720003/score

{
	"count": 6,
	"rating": 3.03125
}
```
