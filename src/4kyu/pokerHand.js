export const  Result = { win: 1, loss: 2, tie: 3 }

export class PokerHand {
  constructor(handString) {
    const parser = new HandParser()
    this.data = parser.parse(handString)
    this.winRules = [
      () => this.isHighCard(),
      () => this.isPair(),
      () => this.isDoublePair(),
      () => this.isThreeOfKind(),
      () => this.isStraight(),
      () => this.isFlush(),
      () => this.isFullHouse(),
      () => this.isFourOfKind(),
      () => this.isStraightFlush()
    ]
  }

  isFlush() {
    return this.data.suitCount === 1
  }

  isStraight() {
    const ranksSorted = Object.keys(this.data.ranks).sort((aIdx, bIdx) => parseInt(this.data.ranks[aIdx]) - parseInt(this.data.ranks[bIdx]))
    return parseInt(ranksSorted[4]) - parseInt(ranksSorted[0]) === 4 || (ranksSorted[0] === '2' && ranksSorted[3] === '5' && ranksSorted[4] === '14')
  }

  isHighCard() {
    return Object.keys(this.data.ranks).length === 5
    && !this.isStraight() && !this.isFlush()
  }

  isPair() {
    return Object.keys(this.data.ranks).length === 4
  }

  isDoublePair() {
    return Object.keys(this.data.ranks).length === 3
    && this._getSameKind(this.data.ranks, 2).length === 2
  }

  isThreeOfKind() {
    return Object.keys(this.data.ranks).length === 3
    && this._getSameKind(this.data.ranks, 3).length === 1
  }

  isFullHouse() {
    return Object.keys(this.data.ranks).length === 2
    && this._getSameKind(this.data.ranks, 3).length === 1
  }

  isFourOfKind() {
    return Object.keys(this.data.ranks).length === 2
    && this._getSameKind(this.data.ranks, 4).length === 1
  }

  isStraightFlush() {
    return this.isStraight() && this.isFlush()
  }

  _getSameKind(ranks, kindCount) {
    return Object.keys(ranks).filter(cardSuitIdx => ranks[cardSuitIdx].length === kindCount)
  }

  getHandStrength() {
    return this.winRules.length - this.winRules.reverse().findIndex(rule => rule())
  }

  getSorted() {
    return Object.keys(this.data.ranks).sort((a, b) => {
      if (this.data.ranks[a].length === this.data.ranks[b].length) {
        return b - a
      }
      return this.data.ranks[b].length - this.data.ranks[a].length
    })
  }

  getStraightHighest() {
    const sorted = this.getSorted()
    if (sorted[0] === '14' && sorted[sorted.length - 1] === '2') {
      sorted.shift()
      sorted.push('1')
    }
    return sorted
  }
  
  compareWith(pokerHand) {
    const myHandStrength = this.getHandStrength()
    const otherHandStrength = pokerHand.getHandStrength()
    if (myHandStrength > otherHandStrength) {
      return Result.win
    } else if (myHandStrength < otherHandStrength) {
      return Result.loss
    }

    let mySorted = this.getSorted()
    let otherSorted = pokerHand.getSorted()

    if ([9, 5].includes(myHandStrength)) {
      mySorted = this.getStraightHighest()
      otherSorted = pokerHand.getStraightHighest()
    }
    for( let i = 0; i < mySorted.length; i++) {
      const mySortedI = parseInt(mySorted[i])
      const otherSortedI = parseInt(otherSorted[i])
      if (mySortedI > otherSortedI) {
        return Result.win
      } else if (mySortedI < otherSortedI) {
        return Result.loss
      }
    }

    return Result.tie
  }
}

export class HandParser {
  constructor() {
    this.charToRank = {
      '2': 2,
      '3': 3,
      '4': 4,
      '5': 5,
      '6': 6,
      '7': 7,
      '8': 8,
      '9': 9,
      'T': 10,
      'J': 11,
      'Q': 12,
      'K': 13,
      'A': 14
    }
    this.charToSuit = {
      'H': 'Hearts',
      'D': 'Diamonds',
      'S': 'Spades',
      'C': 'Clubs'
    }
  }
  parse(handString) {
    const ranks = {}
    const suits = {}
    handString
      .split(' ')
      .forEach(card => {
        const rank = String(this.charToRank[card.charAt(0)])
        const suit = this.charToSuit[card.charAt(1)]
        if (!Object.keys(ranks).includes(rank)) {
          ranks[rank] = []
        }
        ranks[rank].push(suit)
        suits[suit] = true

      })
    return {
      ranks,
      suitCount: Object.keys(suits).length
    }
  }
}