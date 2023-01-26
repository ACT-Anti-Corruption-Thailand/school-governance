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

### Get school score

```
GET /schools/:schoolId/score
```

**Response**

```json
// GET /schools/1010720003/score

{
	"count": 6,
	"rating": 3.03125
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
