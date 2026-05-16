package core

type ScryfallError struct {
	IsScryfallError bool
	Sdk              string
	Code             string
	Msg              string
	Ctx              *Context
	Result           any
	Spec             any
}

func NewScryfallError(code string, msg string, ctx *Context) *ScryfallError {
	return &ScryfallError{
		IsScryfallError: true,
		Sdk:              "Scryfall",
		Code:             code,
		Msg:              msg,
		Ctx:              ctx,
	}
}

func (e *ScryfallError) Error() string {
	return e.Msg
}
