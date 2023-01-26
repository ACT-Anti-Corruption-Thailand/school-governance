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

## Authorization

Protected endpoint required bearer token in authorization header

```
authorization: Bearer <token>
```

## Endpoints

### Health check

```
GET /
```

**Response**

```JSON
School Governance API is doing OK :)
```

### Get school rating

```
GET /schools/:schoolId/rating
```

**Response**

```json
// GET /schools/1010720003/rating

{
	"count": 6,
	"rating": 3.234375,
	"raw": {
		"countC1": 4,
		"countC2": 4,
		"countC3": 4,
		"countC4": 4,
		"countC5": 4,
		"countT1": 3,
		"countT2": 3,
		"countT3": 3,
		"countT4": 3,
		"countT5": 3,
		"countF1": 1,
		"countF2": 1,
		"countF3": 1,
		"countF4": 1,
		"countF5": 1,
		"countG1": 2,
		"countG2": 2,
		"countG3": 2,
		"countG4": 2,
		"countG5": 2,
		"sumF1": 4,
		"sumC1": 14,
		"sumF2": 3,
		"sumC2": 15,
		"sumC3": 16,
		"sumC4": 16,
		"sumF3": 4,
		"sumC5": 17,
		"sumF4": 3,
		"sumT1": 9,
		"sumF5": 3,
		"sumT2": 8,
		"sumT3": 5,
		"sumG1": 7,
		"sumT4": 11,
		"sumT5": 9,
		"sumG3": 4,
		"sumG4": 5,
		"sumG5": 6,
		"sumG2": 7
	}
}
```

### Get school comments

```
GET /schools/:schoolId/comments
```

**Optional query**

- locations: comma-seperated locations
- years: comma-seperated years
- sort: `latest`

**Response**

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

### Like a comment

```
POST /schools/:schoolId/comments/:commentId/like
```

**Body**

```json
{
	// OPTIONAL: Mimicking query parameter from Get school comments
	"schoolCommentsQuery": {
		"locations": string?, // comma-seperated locations
		"years": string?,			// comma-seperated years
		"sort": string?				// `latest`
	}

}
```

**Response**

The same with _get school comments_

### Unlike a comment

```
DELETE /schools/:schoolId/likes/:likeId
```

**Body**

```json
{
	// OPTIONAL: Mimicking query parameter from Get school comments
	"schoolCommentsQuery": {
		"locations": string?, // comma-seperated locations
		"years": string?,			// comma-seperated years
		"sort": string?				// `latest`
	}

}
```

**Response**

The same with _get school comments_

### Create a comment

```
PUT /schools/:schoolId/comments
```

**Body**

```json
{
	"comments": string,
	"location": string,
	"schoolYear": number,
	"uploadedFiles": string[]?,
	// OPTIONAL: Mimicking query parameter from Get school comments
	"schoolCommentsQuery": {
		"locations": string?, // comma-seperated locations
		"years": string?,			// comma-seperated years
		"sort": string?				// `latest`
	}

}
```

**Response**

The same with _get school comments_

### Delete a comment

```
DELETE /schools/:schoolId/comments/:commentId
```

**Body**

```json
{
	// OPTIONAL: Mimicking query parameter from Get school comments
	"schoolCommentsQuery": {
		"locations": string?, // comma-seperated locations
		"years": string?,			// comma-seperated years
		"sort": string?				// `latest`
	}

}
```

**Response**

The same with _get school comments_

### Get school annoucements

```
GET /schools/:schoolId/annoucements
```

**Response**

```json
// GET /schools/1010720003/annoucements

{
	"list": [
		{
			"Id": 1,
			"schoolId": "1010720003",
			"announceTitle": "ปรับปรุงอาคาร",
			"announcePerson": "ผู้อำนวยการโรงเรียน",
			"announceContent": "ต่อยอดคอมเมนท์ดอกเตอร์เฟรชชี่ศึกษาศาสตร์ไวกิ้ง",
			"announceDate": "2022-12-15T09:03:16.174Z"
		}
	],
	"pageInfo": {
		"totalRows": 1,
		"page": 1,
		"pageSize": 999,
		"isFirstPage": true,
		"isLastPage": true
	}
}
```
