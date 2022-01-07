package typedDB

import "net/http"

func GiveResponse (statusCode int, statusMessage string) map[string]interface{} {
	return map[string]interface{}{
		"statusCode": statusCode,
		"statusMessage": statusMessage,
	}
}

func GiveResponseWithData (statusCode int, statusMessage string, data interface{}) map[string]interface{} {
	return map[string]interface{}{
		"statusCode": statusCode,
		"statusMessage": statusMessage,
		"data": data,
	}
}

func GiveOKResponseWithData (data interface{}) map[string]interface{} {
	return map[string]interface{}{
		"statusCode": http.StatusOK,
		"statusMessage": "Accepted",
		"data": data,
	}
}