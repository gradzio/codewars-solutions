import { HandParser, PokerHand, Result } from './pokerHand'

describe('pokerHand', () => {
  describe('HandParser', () => {
    it('should parse', () => {
      const parser = new HandParser()
      expect(parser.parse('2S AH 4D 5S 6C')).toEqual({
        ranks: {
          '2': ['Spades'],
          '14': ['Hearts'],
          '4': ['Diamonds'],
          '5': ['Spades'],
          '6': ['Clubs']
        },
        suitCount: 4
      })
    })
  })

  describe('PokerHand', () => {
    const handProvider = {
      highCard: [
        '2H 4S 3C 9H 5D',
        'AH 4S 3C 9H TD'
      ],
      pair: [
        '2H 2S 4S TS QS',
        '3H 3S 4S 2C 5S',
        '3H 2S 4S 4C QS'
      ],
      doublePair: [
        '2H 2S 4S 4C QS',
        'AH AS QS 4C QD'
      ],
      threeOfKind: [
        '2H 2S 4S 2C QS',
        'QH QS 4D 2C QS',
      ],
      straight: [
        '2S 5S 4D 3S 6S',
        'AS QD KC JS TS',
        '2S 5S 4S AS 3S',
        'TS 9C JS 8C QS'
      ],
      flush: [
        '2S 5S 4S TS QS',
        '2D 9D QD AD 3D',
        '3H 2H 9H 4H 5H'
      ],
      fullHouse: [
        '2H 2S 4S 2C 4C',
        'AH AS QS AC QC'
      ],
      fourOfKind: [
        '2H 2S 4S 2C 2C',
        'AH AS QS AC AC',
      ],
      straightFlush: [
        '2S 5S 4S 3S 6S',
        'TD 9D JD 8D QD',
      ]
    }

    const handStringToTruthy = (handString, func) => {
      const pokerHand = new PokerHand(handString)

      expect(pokerHand[func]()).toBeTruthy()
    }
    it('should detect high card', () => {
      handProvider.highCard.forEach(handString => handStringToTruthy(handString, 'isHighCard'))
    })
    it('should detect flush', () => {
      handProvider.flush.forEach(handString => handStringToTruthy(handString, 'isFlush'))
    })

    it('should detect straight', () => {
      handProvider.straight.forEach(handString => handStringToTruthy(handString, 'isStraight'))
    })

    it('should detect single pair', () => {
      handProvider.pair.forEach(handString => handStringToTruthy(handString, 'isPair'))
    })

    it('should detect double pair', () => {
      handProvider.doublePair.forEach((handString) => handStringToTruthy(handString, 'isDoublePair'))
    })

    it('should detect three of a kind', () => {
      handProvider.threeOfKind.forEach((handString) => handStringToTruthy(handString, 'isThreeOfKind'))
    })

    it('should detect full house', () => {
      handProvider.fullHouse.forEach((handString) => handStringToTruthy(handString, 'isFullHouse'))
    })

    it('should detect four of a kind', () => {
      handProvider.fourOfKind.forEach((handString) => handStringToTruthy(handString, 'isFourOfKind'))
    })

    it('should detect straight flush', () => {
      handProvider.straightFlush.forEach((handString) => handStringToTruthy(handString, 'isStraightFlush'))
    })

    it('should get hand strength', () => {
      [
        {handString: handProvider.straightFlush[0], expected: 9},
        {handString: handProvider.fourOfKind[0], expected: 8},
        {handString: handProvider.fullHouse[0], expected: 7},
        {handString: handProvider.flush[0], expected: 6},
        {handString: handProvider.straight[0], expected: 5},
        {handString: handProvider.threeOfKind[0], expected: 4},
        {handString: handProvider.doublePair[0], expected: 3},
        {handString: handProvider.pair[0], expected: 2},
        {handString: handProvider.highCard[0], expected: 1}
      ].forEach(({handString, expected}) => {
        const pokerHand = new PokerHand(handString)

        expect(pokerHand.getHandStrength()).toBe(expected)
      })
    })

    it('should get highest straight', () => {
      [
        {handString: '2S 5S 4D 3S 6S', expected: ['6', '5', '4', '3', '2']},
        {handString: '2S 5S 4S AS 3S', expected: ['5', '4', '3', '2', '1']},
        {handString: 'TD 9D JD 8D QD', expected: ['12', '11', '10', '9', '8']}
      ].forEach(({handString, expected}) => {
        const pokerHand = new PokerHand(handString)
        expect(pokerHand.getStraightHighest()).toEqual(expected)
      })
    })

    it('should get sorted', () => {
      [
        {handString: '2S 2S 4D 3S 6S', expected: ['2', '6', '4', '3']},
        {handString: '2S 2S 2D 3S 6S', expected: ['2', '6', '3']},
        {handString: '2S 2S 3D 3S 6S', expected: ['3', '2', '6']},
        {handString: 'AS 2S QD 3S KS', expected: ['14', '13', '12', '3', '2']}
      ].forEach(({handString, expected}) => {
        const pokerHand = new PokerHand(handString)
        expect(pokerHand.getSorted()).toEqual(expected)
      })
    })

    it('should compare hands straight win hands', () => {
      [
        {handStringP: handProvider.doublePair[0], handStringO: handProvider.pair[0], expected: Result.win},
        {handStringP: handProvider.threeOfKind[0], handStringO: handProvider.fullHouse[0], expected: Result.loss},
        {handStringP: handProvider.fourOfKind[0], handStringO: handProvider.straightFlush[0], expected: Result.loss}
      ].forEach(({handStringP, handStringO, expected}) => {
        const p = new PokerHand(handStringP)
        const o = new PokerHand(handStringO)

        expect(p.compareWith(o)).toBe(expected)
      })
    })

    it('should compare same category hands', () => {
      [
        {handStringP: handProvider.straightFlush[0], handStringO: handProvider.straightFlush[1], expected: Result.loss},
        {handStringP: handProvider.straight[0], handStringO: handProvider.straight[1], expected: Result.loss},
        {handStringP: handProvider.flush[0], handStringO: handProvider.flush[1], expected: Result.loss},
        {handStringP: handProvider.highCard[0], handStringO: handProvider.highCard[1], expected: Result.loss},
        {handStringP: handProvider.pair[0], handStringO: handProvider.pair[1], expected: Result.loss},
        {handStringP: '6S AD 7H 4S AS', handStringO: 'AH AC 5H 6H 7S', expected: Result.loss},
        {handStringP: '4S 5H 6H TS AC', handStringO: '3S 5H 6H TS AC', expected: Result.win},
        {handStringP: '4S 5H 6H TS AC', handStringO: '4C 5D 6D TC AD', expected: Result.tie},
      ].forEach(({handStringP, handStringO, expected}) => {
        const p = new PokerHand(handStringP)
        const o = new PokerHand(handStringO)

        expect(p.compareWith(o)).toBe(expected)
      })
    })
  })
})