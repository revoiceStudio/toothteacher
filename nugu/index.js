class Directive {
  constructor({type, audioItem}) {
    this.type = type
    this.audioItem = audioItem
  }
}

function audioPlayerDirective(soundFileName) {

  return new Directive({
    type: 'AudioPlayer.Play',
    audioItem: {
      stream: {
        url: `https://study.revoice.kr/toothteacher/rsc/` + soundFileName,
        offsetInMilliseconds: 0,
        token: 0,
        //expectedPreviousToken: 'expectedPreviousToken',
      }
    }
  })
}

class ChikaSamRequest {
  constructor (httpReq) {
    this.context = httpReq.body.context
    this.action = httpReq.body.action
    //console.log(`chikaSamRequest: ${JSON.stringify(this.context)}, ${JSON.stringify(this.action)}`)
    console.log(`chikaSamRequest : 
        context :
      ${JSON.stringify(this.context)}
        action :
      ${JSON.stringify(this.action)}`)
  }

  do(chikaSamResponse) {
    this.actionRequest(chikaSamResponse)
  }

  actionRequest(chikaSamResponse) {
    console.log('actionRequest')
    console.dir(this.action)

    const actionName = this.action.actionName
    const parameters = this.action.parameters

    switch (actionName) {
    case 'startAction':
      const soundTypeSlot = parameters.sound_type
      let soundFileName
      let fir, sec

      soundFileName = getRandomNumber(1, 6) + '.mp3'

      chikaSamResponse.addDirective(audioPlayerDirective(soundFileName))
      break
    }
  }
}

function getRandomNumber(min, max) { 
  return Math.floor(Math.random() * (max - min)) + min;
}

class ChikaSamResponse {
  constructor () {
    console.log('chikaSamResponse constructor')

    this.version = '2.0'
    this.resultCode = 'OK'
    //this.output = {}
    this.directives = []
  }

  addDirective(directive) {
    this.directives.push(directive)
    console.log('Directive Object has been inputted Successfully!');
    console.dir(directive);
  }

}

const nuguReq = function (httpReq, httpRes, next) {
  chikaSamResponse = new ChikaSamResponse()
  chikaSamRequest = new ChikaSamRequest(httpReq)
  chikaSamRequest.do(chikaSamResponse)
  console.log('chikaSam Response')
  console.log(JSON.stringify(chikaSamResponse))
  return httpRes.send(chikaSamResponse)
};

module.exports = nuguReq;
