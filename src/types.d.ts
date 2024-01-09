declare type IsPositive<N extends number> = `${N}` extends `-${string}` ? false : true

declare type IsInteger<N extends number> = `${N}` extends `${string}.${string}`
  ? never
  : `${N}` extends `-${string}.${string}`
  ? never
  : number

declare type IsValid<N extends number> = IsPositive<N> extends true
  ? IsInteger<N> extends number
  ? number
  : never
  : never

declare type PositiveNumber<
  N extends number,
  T extends number[] = []
> = T["length"] extends N ? T[number] : PositiveNumber<N, [...T, T["length"]]>

declare type NumberBetween<N1 extends IsValid<N1>, N2 extends IsValid<N2>> = Exclude<
  PositiveNumber<N2>,
  PositiveNumber<N1>
>

declare type unit = "light_sound" | "idol" | "street" | "theme_park" | "school_refusal" | "piapro"
declare type subunit = "none" | Exclude<unit, "piapro">
declare type attr = "cute" | "cool" | "pure" | "happy" | "mysterious"

declare type gameCharacterId = NumberBetween<1, 27>

declare type gameCharacterUnitId = NumberBetween<1, 57>

declare type cardRarityType = "rarity_1" | "rarity_2" | "rarity_3" | "rarity_4" | "rarity_birthday"

declare type cardParameterType = "param1" | "param2" | "param3"

declare interface GachaDetail {
  id: number
  gachaId: number
  cardId: number
  weight: number
  isWish: boolean
}

declare interface GachaBehavior {
  id: number
  gachaId: number
  groupId: number
  priority: number
  gachaBehaviorType: string
  gachaSpinnableType: string
  costResourceType?: string
  costResourceQuantity?: number
  costResourceId?: number
  resourceCategory: string
  spinCount: number
  executeLimit?: number
}

declare interface GachaPickup {
  id?: number
  gachaId: number
  cardId: number
  gachaPickupType?: string
}

declare interface GachaInformation {
  gachaId: number
  summary: string
  description: string
}

declare interface GachaCardRarityRate {
  id?: number
  groupId?: number
  cardRarityType: cardRarityType
  rate: number
  lotteryType: string
}

declare interface IGachaInfo {
  id: number
  gachaType: string
  name: string
  seq: number
  assetbundleName: string
  startAt: number
  endAt: number
  drawableGachaHour?: number
  gachaCeilItemId?: number
  gachaCardRarityRateGroupId: gachaCardRarityRateGroupId
  gachaCardRarityRates: GachaCardRarityRate[]
  gachaDetails: GachaDetail[]
  gachaBehaviors: GachaBehavior[]
  gachaPickups: GachaPickup[]
  gachaPickupCostumes: never[]
  gachaInformation: GachaInformation
  isShowPeriod: boolean
  wishFixedSelectCount: number
  wishLimitedSelectCount: number
  wishSelectCount: number
}

declare interface Cost {
  resourceId: number
  resourceType: string
  resourceLevel?: number
  quantity: number
}

declare interface CardParameter {
  id: number
  cardId: number
  cardLevel: number
  cardParameterType: cardParameterType
  power: number
}

declare interface ICardInfo {
  id: number
  seq: number
  characterId: gameCharacterId
  cardRarityType: cardRarityType
  specialTrainingPower1BonusFixed: number
  specialTrainingPower2BonusFixed: number
  specialTrainingPower3BonusFixed: number
  attr: attr
  supportUnit: subunit
  skillId: number
  cardSkillName: string
  prefix: string
  assetbundleName: string
  gachaPhrase: string
  flavorText: string
  releaseAt: number
  archivePublishedAt: number
  archiveDisplayType?: string
  cardParameters: CardParameter[]
  specialTrainingCosts: {
    cardId: number
    seq: number
    cost: Cost
  }[]
  masterLessonAchieveResources: {
    releaseConditionId: number
    cardId: number
    masterRank: number
    resources: {}[]
  }[]
}

declare interface IGameChara {
  id: gameCharacterId
  seq: number
  resourceId: number
  firstName: string
  givenName: string
  firstNameRuby: string
  givenNameRuby: string
  gender: string
  height: number
  live2dHeightAdjustment: number
  figure: string
  breastSize: string
  modelName: string
  unit: string
  supportUnitType: "none" | "full" | "unit"
}
declare interface EventRankingReward {
  id: number
  eventRankingRewardRangeId: number
  resourceBoxId: number
}

declare interface EventRankingRewardRange {
  id: number
  eventId: number
  fromRank: number
  toRank: number
  eventRankingRewards: EventRankingReward[]
}

declare type EventType = "marathon" | "cheerful_carnival" | "challenge_live" | "world_bloom"

declare interface IEventInfo {
  id: number
  eventType: EventType
  name: string
  assetbundleName: string
  bgmAssetbundleName: string
  startAt: number
  aggregateAt: number
  rankingAnnounceAt: number
  distributionStartAt: number
  closedAt: number
  distributionEndAt: number
  virtualLiveId: number
  unit: unit | "none"
  eventRankingRewardRanges: EventRankingRewardRange[]
}

declare interface IEventDeckBonus {
  id: number
  eventId: number
  gameCharacterUnitId: gameCharacterUnitId
  cardAttr: attr
  bonusRate: number
}

declare interface IGameCharaUnit {
  id: gameCharacterUnitId
  gameCharacterId: gameCharacterId
  unit: unit
  colorCode: string
  skinColorCode: string
  skinShadowColorCode1: string
  skinShadowColorCode2: string
}

declare interface IEventCard {
  id: number
  cardId: number
  eventId: number
  bonusRate?: number
}