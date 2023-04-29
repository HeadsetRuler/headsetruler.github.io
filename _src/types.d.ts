declare type ContentTransModeType = "original" | "translated" | "both"
declare type DisplayModeType = "dark" | "light" | "auto"
declare type ServerRegion = "jp" | "tw" | "en" | "kr"
declare type AssetDomainKey = "cn" | "minio"
declare type ComicLangType =
  | "ja"
  | "fr"
  | "ru"
  | "zhs"
  | "zht"
  | "en"
  | "ua"
  | "kr"

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
declare enum unitAbbreviation {
  light_sound = "LEO",
  idol = "MMJ",
  street = "VBS",
  theme_park = "WxS",
  school_refusal = "N25",
  piapro = "PIA"
}
declare type subunit = "none" | Exclude<unit, "piapro">
declare type attr = "cute" | "cool" | "pure" | "happy" | "mysterious"

declare enum attrAbbreviation {
  cute = "CU",
  cool = "CO",
  pure = "PU",
  happy = "HA",
  mysterious = "MY"
}

declare type gameCharacterId = NumberBetween<1, 27>

declare type gameCharacterUnitId = NumberBetween<1, 57>

declare type cardRarityType = "rarity_1" | "rarity_2" | "rarity_3" | "rarity_4" | "rarity_birthday"

declare type cardParameterType = "param1" | "param2" | "param3"

declare interface GachaDetail {
  id: number
  gachaId: number
  cardId: number
  weight: number
}

declare interface GachaBehavior {
  id: number
  gachaId: number
  gachaBehaviorType: string
  costResourceType: string
  costResourceQuantity: number
  spinCount: number
  spinLimit: number
  gachaSpinnableType?: string
}

declare interface GachaPickup {
  id: number
  gachaId: number
  cardId: number
  gachaPickupType: string
}

declare interface GachaInformation {
  gachaId: number
  summary: string
  description: string
}

declare interface GachaCardRarityRate {
  id: number
  groupId: number
  cardRarityType: cardRarityType
  rate: number
}

declare enum gachaCardRarityRateGroupId {
  Normal = 1,
  ThreeStarPlus = 2,
  Festa = 3,
  Birthday = 4
}

declare interface IGachaInfo {
  id: number
  gachaType: string
  name: string
  seq: number
  assetbundleName: string
  gachaCardRarityRateGroupId: gachaCardRarityRateGroupId
  startAt: EpochTimeStamp
  endAt: EpochTimeStamp
  isShowPeriod: boolean
  spinLimit: number
  gachaCeilItemId: number
  wishSelectCount: number
  wishFixedSelectCount: number
  wishLimitedSelectCount: number
  gachaCardRarityRates: GachaCardRarityRate[]
  gachaDetails: GachaDetail[]
  gachaBehaviors: GachaBehavior[]
  gachaPickups: GachaPickup[]
  gachaPickupCostumes: never[]
  gachaInformation: GachaInformation
}

declare interface Cost {
  resourceId: number
  resourceType: string
  resourceLevel?: number
  quantity: number
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
  releaseAt: EpochTimeStamp
  cardParameters: {
    id: number
    cardId: number
    cardLevel: number
    cardParameterType: cardParameterType
    power: number
  }[]
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
  unit: unit
  supportUnitType: "none" | "full" | "unit"
}

declare interface GachaStatistic {
  spinCount: number
  cost: {
    ticket: number
    jewel: number
  }
  counts: number[]
}

declare interface IMusicInfo {
  id: number
  seq: number
  releaseConditionId: number
  categories: string[]
  title: string
  lyricist: string
  composer: string
  arranger: string
  dancerCount: number
  selfDancerPosition: number
  assetbundleName: string
  liveTalkBackgroundAssetbundleName: string
  publishedAt: EpochTimeStamp
  liveStageId: number
  fillerSec: number
}

declare interface IMusicAchievement {
  id: number
  musicAchievementType: string
  musicAchievementTypeValue: string
  resourceBoxId: number
  musicDifficultyType: string
}

declare interface SkillEffectDetail {
  id: number
  level: number
  activateEffectDuration: number
  activateEffectValueType: string
  activateEffectValue: number
}

declare interface SkillEnhanceCondition {
  id: number
  seq: number
  unit: string
}

declare interface SkillEnhance {
  id: number
  skillEnhanceType: string
  activateEffectValueType: string
  activateEffectValue: number
  skillEnhanceCondition: SkillEnhanceCondition
}

declare interface SkillEffect {
  id: number
  skillEffectType: string
  activateNotesJudgmentType: string
  skillEffectDetails: SkillEffectDetail[]
  skillEnhance: SkillEnhance
}

declare interface ISkillInfo {
  id: number
  shortDescription: string
  description: string
  descriptionSpriteName: string
  skillEffects: SkillEffect[]
}

declare interface ICardRarity {
  maxLevel: 20 | 30 | 40 | 50 | 60
  maxSkillLevel: 4
  trainingMaxLevel?: 50 | 60
  cardRarityType: cardRarityType
}

declare interface CharacterRankAchieveResource {
  releaseConditionId: number
  characterId: gameCharacterId
  characterRank: number
  resources: any[]
}

declare interface ICharacterRank {
  id: number
  characterId: gameCharacterId
  characterRank: number
  power1BonusRate: number
  power2BonusRate: number
  power3BonusRate: number
  rewardResourceBoxIds: number[]
  characterRankAchieveResources: CharacterRankAchieveResource[]
}

declare interface VocalCharacter {
  id: number
  musicId: number
  musicVocalId: number
  characterType: string
  characterId: number
  seq: number
}

declare interface IMusicVocalInfo {
  id: number
  musicId: number
  musicVocalType: string
  seq: number
  releaseConditionId: number
  caption: string
  characters: VocalCharacter[]
  assetbundleName: string
}

declare interface IOutCharaProfile {
  id: number
  seq: number
  name: string
}

declare interface IUserInformationInfo {
  id: number
  seq: number
  informationType: string
  informationTag: string
  browseType: string
  platform: string
  title: string
  path: string
  startAt: EpochTimeStamp
  endAt: EpochTimeStamp
}

declare type musicDifficulty = "easy" | "normal" | "hard" | "expert" | "master"

declare interface IMusicDifficultyInfo {
  id: number
  musicId: number
  musicDifficulty: musicDifficulty
  playLevel: musicDifficulty
  releaseConditionId: number
  noteCount?: number
  totalNoteCount?: number
}

declare interface IMusicTagInfo {
  id: number
  musicId: number
  musicTag: string
  seq: number
}

declare interface IReleaseCondition {
  id: number
  sentence: string
  releaseConditionType: string
  releaseConditionTypeId?: number
  releaseConditionTypeLevel?: number
  releaseConditionTypeQuantity?: number
}

declare type IMusicDanceMembers =
  {
    id: number
    musicId: number
    defaultMusicType: string
    characterId1: gameCharacterId
    unit1: unit
  } | {
    id: number
    musicId: number
    defaultMusicType: string
    characterId1: gameCharacterId
    unit1: unit
    characterId2: gameCharacterId
    unit2: unit
  } | {
    id: number
    musicId: number
    defaultMusicType: string
    characterId1: gameCharacterId
    unit1: unit
    characterId2: gameCharacterId
    unit2: unit
    characterId3: gameCharacterId
    unit3: unit
  } | {
    id: number
    musicId: number
    defaultMusicType: string
    characterId1: gameCharacterId
    unit1: unit
    characterId2: gameCharacterId
    unit2: unit
    characterId3: gameCharacterId
    unit3: unit
    characterId4: gameCharacterId
    unit4: unit
  } | {
    id: number
    musicId: number
    defaultMusicType: string
    characterId1: gameCharacterId
    unit1: unit
    characterId2: gameCharacterId
    unit2: unit
    characterId3: gameCharacterId
    unit3: unit
    characterId4: gameCharacterId
    unit4: unit
    characterId5: gameCharacterId
    unit5: unit
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

declare type EventType = "marathon" | "cheerful_carnival"

declare interface IEventInfo {
  id: number
  eventType: EventType
  name: string
  assetbundleName: string
  bgmAssetbundleName: string
  startAt: EpochTimeStamp
  aggregateAt: EpochTimeStamp
  rankingAnnounceAt: EpochTimeStamp
  distributionStartAt: EpochTimeStamp
  closedAt: EpochTimeStamp
  distributionEndAt: EpochTimeStamp
  virtualLiveId: EpochTimeStamp
  unit: unit | "none"
  eventRankingRewardRanges: EventRankingRewardRange[]
}

declare interface IEventDeckBonus {
  id: number
  eventId: number
  gameCharacterUnitId?: gameCharacterUnitId
  cardAttr?: attr
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

declare interface UserCardRanking {
  cardId: number
  level: number
  masterRank: number
  specialTrainingStatus: string
  defaultImage: string
}

declare interface UserProfileRanking {
  userId: string | number
  word: string
  honorId1?: number
  honorLevel1?: number
  honorId2?: number
  honorLevel2?: number
  honorId3?: number
  honorLevel3?: number
  twitterId: string
  profileImageType: string
  userVirtualLiveTop10Rankings?: any[]
}

declare interface ResourceBoxDetail {
  resourceBoxPurpose: string
  resourceBoxId: number
  seq: number
  resourceType: string
  resourceQuantity: number
  resourceId?: number
  resourceLevel?: number
}

declare interface IResourceBoxInfo {
  resourceBoxPurpose: string
  id: number
  resourceBoxType: string
  details: ResourceBoxDetail[]
  description: string
  name: string
  assetbundleName: string
}

declare interface HonorLevel {
  honorId: number
  level: number
  bonus: number
  description: string
}

declare interface IHonorInfo {
  id: number
  seq: number
  groupId: number
  honorRarity: string
  name: string
  assetbundleName: string
  levels: HonorLevel[]
}

declare interface ICardEpisode {
  id: number
  seq: 1 | 2
  cardId: number
  title: string
  scenarioId: string
  assetbundleName: string
  releaseConditionId: number
  power1BonusFixed: number
  power2BonusFixed: number
  power3BonusFixed: number
  rewardResourceBoxIds: number[]
  costs: Cost[]
  cardEpisodePartType: "first_part" | "second_part"
}

declare interface IStampInfo {
  id: number
  stampType: string
  seq: number
  name: string
  assetbundleName: string
  balloonAssetbundleName: string
  characterId1: gameCharacterId
}

declare interface ITipInfoComic {
  id: number
  title: string
  fromUserRank: number
  toUserRank: number
  assetbundleName: string
}

declare interface ITipInfoText {
  id: number
  title: string
  fromUserRank: number
  toUserRank: number
  description: string
}

declare type ITipInfo = ITipInfoText | ITipInfoComic

declare interface ICharaUnitInfo {
  id: number
  gameCharacterId: gameCharacterId
  unit: unit
  colorCode: string
  skinColorCode: string
  skinShadowColorCode1: string
  skinShadowColorCode2: string
}

declare interface ICharaProfile {
  characterId: gameCharacterId
  characterVoice: string
  birthday: string
  height: string
  school: string
  schoolYear: string
  hobby: string
  specialSkill: string
  favoriteFood: string
  hatedFood: string
  weak: string
  introduction: string
  scenarioId: string
}

declare interface IUnitProfile {
  unit: unit
  unitName: string
  seq: number
  profileSentence: string
  colorCode: string
}

declare interface ITeamCardState {
  cardId: number
  level: number
  skillLevel: number
  trained: boolean
  trainable: boolean
  // power: number;
  masterRank: number
  story1Unlock: boolean
  story2Unlock: boolean
}

declare interface ITeamBuild {
  id?: number
  teamCards: number[]
  teamCardsStates: ISekaiCardState[]
  teamTotalPower: number
}

declare interface ISekaiCardState {
  cardId: number
  defaultImage: string
  episodes: [ISekaiUserCardEpisode, ISekaiUserCardEpisode]
  level: number
  masterRank: number
  specialTrainingStatus: string
}

declare interface ISekaiUserCardEpisode {
  cardEpisodeId: number
  isNotSkipped: boolean
  scenarioStatus: string
  scenarioStatusReasons?: string[] | undefined
}

declare interface IMusicMeta {
  music_id: number
  difficulty: musicDifficulty
  level: number
  combo: number
  music_time: number
  event_rate: number
  base_score: number
  skill_score_solo: number[]
  skill_score_multi: number[]
  fever_score: number
}

declare interface IMusicRecommendResult {
  id: number
  mid: number
  name: string
  difficulty: string
  level: number
  combo: number
  result: number | number[]
  link: string
}

declare interface IEventCalcAllSongsResult {
  id: number
  mid: number
  name: string
  difficulty: string
  level: number
  result: number
  resultPerHour: number
}

declare interface IUnitStoryEpisode {
  id: number
  unit: string
  chapterNo: number
  episodeNo: number
  unitEpisodeCategory: string
  episodeNoLabel: string
  title: string
  assetbundleName: string
  scenarioId: string
  releaseConditionId: number
  rewardResourceBoxIds: number[]
  andReleaseConditionId?: number
}

declare interface IUnitStoryChapter {
  id: number
  unit: string
  chapterNo: number
  title: string
  assetbundleName: string
  episodes: IUnitStoryEpisode[]
}

declare interface IUnitStory {
  unit: string
  seq: number
  assetbundleName: string
  chapters: IUnitStoryChapter[]
}

declare interface AppearCharacter {
  Character2dId: number
  CostumeType: string
}

declare enum SnippetAction {
  None = 0,
  Talk = 1,
  CharacerLayout = 2,
  InputName = 3,
  CharacterMotion = 4,
  Selectable = 5,
  SpecialEffect = 6,
  Sound = 7,
}

declare enum SnippetProgressBehavior {
  Now = 0,
  WaitUnitilFinished = 1,
}

declare interface Snippet {
  Action: SnippetAction
  ProgressBehavior: SnippetProgressBehavior
  ReferenceIndex: number
  Delay: number
}

declare interface TalkCharacter {
  Character2dId: number
}

declare interface Motion {
  Character2dId: number
  MotionName: string
  FacialName: string
  TimingSyncValue: number
}

declare interface Voice {
  Character2dId: number
  VoiceId: string
  Volume: number
}

declare interface TalkData {
  TalkCharacters: TalkCharacter[]
  WindowDisplayName: string
  Body: string
  TalkTention: number
  LipSync: number
  MotionChangeFrom: number
  Motions: Motion[]
  Voices: Voice[]
  Speed: number
  FontSize: number
  WhenFinishCloseWindow: number
  RequirePlayEffect: number
  EffectReferenceIdx: number
  RequirePlaySound: number
  SoundReferenceIdx: number
}

declare interface LayoutData {
  Type: number
  SideFrom: number
  SideFromOffsetX: number
  SideTo: number
  SideToOffsetX: number
  DepthType: number
  Character2dId: number
  CostumeType: string
  MotionName: string
  FacialName: string
  MoveSpeedType: number
}

declare enum SpecialEffectType {
  None = 0,
  BlackIn = 1,
  BlackOut = 2,
  WhiteIn = 3,
  WhiteOut = 4,
  ShakeScreen = 5,
  ShakeWindow = 6,
  ChangeBackground = 7,
  Telop = 8,
  FlashbackIn = 9,
  FlashbackOut = 10,
  ChangeCardStill = 11,
  AmbientColorNormal = 12,
  AmbientColorEvening = 13,
  AmbientColorNight = 14,
  PlayScenarioEffect = 15,
  StopScenarioEffect = 16,
  ChangeBackgroundStill = 17,
  PlaceInfo = 18,
  Movie = 19,
  SekaiIn = 20,
  SekaiOut = 21,
  AttachCharacterShader = 22,
  SimpleSelectable = 23,
  FullScreenText = 24,
  StopShakeScreen = 25,
  StopShakeWindow = 26,
}

declare interface SpecialEffectData {
  EffectType: SpecialEffectType
  StringVal: string
  StringValSub: string
  Duration: number
  IntVal: number
}

declare enum SoundPlayMode {
  CrossFade = 0,
  Stack = 1,
  SpecialSePlay = 2,
  Stop = 3,
}

declare interface SoundData {
  PlayMode: SoundPlayMode
  Bgm: string
  Se: string
  Volume: number
  SeBundleName: string
  Duration: number
}

declare interface IScenarioData {
  ScenarioId: string
  AppearCharacters: AppearCharacter[]
  FirstLayout: any[]
  FirstBgm: string
  FirstBackground: string
  Snippets: Snippet[]
  TalkData: TalkData[]
  LayoutData: LayoutData[]
  SpecialEffectData: SpecialEffectData[]
  SoundData: SoundData[]
  NeedBundleNames: string[]
  IncludeSoundDataBundleNames: any[]
}

declare interface IEpisodeCharacter {
  id: number
  seq: number
  character2dId: number
  storyType: string
  episodeId: number
}

declare interface ICharacter2D {
  id: number
  characterType: "game_character" | "mob"
  characterId: number
  unit: string
  assetName: string
}

declare interface IMobCharacter {
  id: number
  seq: number
  name: string
  gender: string
}

declare interface EventStoryEpisodeReward {
  resourceBoxId: number
}

declare interface EventStoryEpisode {
  id: number
  eventStoryId: number
  episodeNo: number
  title: string
  assetbundleName: string
  scenarioId: string
  releaseConditionId: number
  episodeRewards: EventStoryEpisodeReward[]
}

declare interface IEventStory {
  id: number
  eventId: number
  assetbundleName: string
  eventStoryEpisodes: EventStoryEpisode[]
}

declare interface MissionReward {
  id: number
  missionType: string
  missionId: number
  seq: number
  resourceBoxId: number
}

declare interface IHonorMission {
  id: number
  seq: number
  honorMissionType: string
  requirement: number
  sentence: string
  rewards: MissionReward[]
}

declare interface INormalMission {
  id: number
  seq: number
  normalMissionType: string
  requirement: number
  sentence: string
  rewards: MissionReward[]
}

declare interface IBeginnerMission {
  id: number
  seq: number
  beginnerMissionType: string
  beginnerMissionCategory: string
  requirement: number
  sentence: string
  rewards: MissionReward[]
}

declare interface IHonorGroup {
  id: number
  honorType: string
  name: string
  backgroundAssetbundleName?: string
}

declare enum CharacterMissionType {
  PLAY_LIVE = "play_live",
  // COLLECT_CARD = "collect_card",
  WAITING_ROOM = "waiting_room",
  COLLECT_COSTUME_3D = "collect_costume_3d",
  // LIVE_CLEAR = "live_clear",
  COLLECT_STAMP = "collect_stamp",
  READ_AREA_TALK = "read_area_talk",
  // SKILL_EXP = "skill_exp",
  SKILL_LEVEL_UP = "skill_level_up",
  MASTER_RANK = "master_rank",
  // READ_EPISODE = "read_episode",
  READ_CARD_EPISODE_FIRST = "read_card_episode_first",
  READ_CARD_EPISODE_SECOND = "read_card_episode_second",
}

declare interface ICharacterMission {
  id: number
  seq: number
  characterId: number
  characterMissionType: CharacterMissionType
  requirement: number
  sentence: string
}

declare interface UserGamedata {
  userId: string | number
  name: string
  deck: number
  rank: number
}

declare interface User {
  userGamedata: UserGamedata
}

declare interface UserProfile {
  userId: string | number
  word: string
  honorId1?: number
  honorLevel1?: number
  honorId2?: number
  honorLevel2?: number
  honorId3?: number
  honorLevel3?: number
  twitterId: string
  profileImageType: string
}

declare interface UserDeck {
  leader: number
  member1: number
  member2: number
  member3: number
  member4: number
  member5: number
}

declare interface UserCardEpisode {
  cardEpisodeId: number
  scenarioStatus: string
  scenarioStatusReasons?: string[]
  isNotSkipped: boolean
}

declare interface UserCard {
  cardId: number
  level: number
  masterRank: number
  specialTrainingStatus: string
  defaultImage: string
  episodes: UserCardEpisode[]
}

declare interface UserMusicResult {
  userId: string | number
  musicId: number
  musicDifficulty: string
  playType: string
  playResult: string
  highScore: number
  fullComboFlg: boolean
  fullPerfectFlg: boolean
  mvpCount: number
  superStarCount: number
  createdAt: EpochTimeStamp
  updatedAt: EpochTimeStamp
}

declare interface UserMusicDifficultyStatus {
  musicId: number
  musicDifficulty: string
  musicDifficultyStatus: string
  userMusicResults: UserMusicResult[]
}

declare interface UserMusic {
  userId: string | number
  musicId: number
  userMusicDifficultyStatuses: UserMusicDifficultyStatus[]
}

declare interface UserCharacter {
  characterId: number
  characterRank: number
}

declare interface UserChallengeLiveSoloResult {
  characterId: number
  highScore: number
}

declare interface UserChallengeLiveSoloStage {
  challengeLiveStageType: string
  characterId: number
  challengeLiveStageId: number
  rank: number
}

declare interface UserAreaItem {
  areaItemId: number
  level: number
}

declare interface UserHonor {
  userId: string | number
  honorId: number
  level: number
  obtainedAt: EpochTimeStamp
}

declare interface IUserProfile {
  user: User
  userProfile: UserProfile
  userDecks: UserDeck[]
  userCards: UserCard[]
  userMusics: UserMusic[]
  userCharacters: UserCharacter[]
  userChallengeLiveSoloResults: UserChallengeLiveSoloResult[]
  userChallengeLiveSoloStages: UserChallengeLiveSoloStage[]
  userAreaItems: UserAreaItem[]
  userHonors: UserHonor[]
}

declare type EventGraphRanking =
  | 1
  | 2
  | 3
  | 4
  | 5
  | 6
  | 7
  | 8
  | 9
  | 10
  | 20
  | 30
  | 40
  | 50
  | 100
  | 200
  | 300
  | 400
  | 500
  | 1000
  | 2000
  | 3000
  | 4000
  | 5000
  | 10000
  | 20000
  | 30000
  | 40000
  | 50000
  | 100000

declare interface UserCheerfulCarnival {
  cheerfulCarnivalTeamId: number
  eventId: number
  registerAt: EpochTimeStamp
  teamChangeCount: number
}

declare interface IEventCard {
  id: number
  cardId: number
  eventId: number
  bonusRate?: number
}

declare interface IGachaCeilItem {
  id: number
  gachaId: number
  name: string
  assetbundleName: string
  convertStartAt: EpochTimeStamp
  convertResourceBoxId: number
}

declare interface VirtualLiveSetlist {
  id: number
  virtualLiveId: number
  seq: number
  virtualLiveSetlistType: string
  assetbundleName: string
  virtualLiveStageId: number
  musicId?: number
  musicVocalId?: number
  character3dId1?: number
  character3dId2?: number
  character3dId3?: number
  character3dId4?: number
  character3dId5?: number
}

declare interface VirtualLiveBeginnerSchedule {
  id: number
  virtualLiveId: number
  dayOfWeek: string
  startTime: string
  endTime: string
}

declare interface VirtualLiveSchedule {
  id: number
  virtualLiveId: number
  seq: number
  startAt: EpochTimeStamp
  endAt: EpochTimeStamp
}

declare interface VirtualLiveCharacter {
  id: number
  virtualLiveId: number
  gameCharacterUnitId: gameCharacterUnitId
  seq: number
}

declare interface VirtualLiveReward {
  id: number
  virtualLiveType: string
  virtualLiveId: number
  resourceBoxId: number
}

declare interface VirtualLiveReward2 {
  id: number
  virtualLiveType: string
  virtualLiveId: number
  resourceBoxId: number
}

declare interface VirtualLiveWaitingRoom {
  id: number
  virtualLiveId: number
  assetbundleName: string
  startAt: EpochTimeStamp
  endAt: EpochTimeStamp
}

declare interface VirtualItem {
  id: number
  virtualItemCategory: string
  seq: number
  priority: number
  name: string
  assetbundleName: string
  costVirtualCoin: number
  costJewel: number
  cheerPoint: number
  effectAssetbundleName: string
  effectExpressionType: string
  virtualItemLabelType: string
}

declare interface IVirtualLiveInfo {
  id: number
  virtualLiveType: string
  virtualLivePlatform: string
  seq: number
  name: string
  assetbundleName: string
  screenMvMusicVocalId: number
  startAt: EpochTimeStamp
  endAt: EpochTimeStamp
  rankingAnnounceAt: EpochTimeStamp
  virtualLiveSetlists: VirtualLiveSetlist[]
  virtualLiveBeginnerSchedules: VirtualLiveBeginnerSchedule[]
  virtualLiveSchedules: VirtualLiveSchedule[]
  virtualLiveCharacters: VirtualLiveCharacter[]
  virtualLiveReward: VirtualLiveReward
  virtualLiveRewards: VirtualLiveReward2[]
  virtualLiveCheerPointRewards: any[]
  virtualLiveWaitingRoom: VirtualLiveWaitingRoom
  virtualItems: VirtualItem[]
  archiveReleaseConditionId?: number
}
declare interface ICharacter3D {
  id: number
  characterType: string
  characterId: number
  unit: string
  name: string
  headCostume3dId: number
  bodyCostume3dId: number
}

declare interface ICostume3DModel {
  id: number
  costume3dId: number
  unit: string
  assetbundleName: string
  thumbnailAssetbundleName: string
}

declare interface IAreaItemLevel {
  areaItemId: number
  level: number
  targetUnit: string
  targetCardAttr?: attr
  targetGameCharacterId?: gameCharacterId
  power1BonusRate: number
  power1AllMatchBonusRate: number
  power2BonusRate: number
  power2AllMatchBonusRate: number
  power3BonusRate: number
  power3AllMatchBonusRate: number
  sentence: string
}

declare interface IAreaItem {
  id: number
  areaId: number
  name: string
  flavorText: string
  spawnPoint: string
  assetbundleName: string
}

declare interface EventPrediction {
  data: {
    ts: number
    "100": number
    "200": number
    "500": number
    "1000": number
    "2000": number
    "5000": number
    "10000": number
    "20000": number
    "50000": number
    "100000": number
  }
}

declare interface ICheerfulCarnivalSummary {
  id: number
  eventId: number
  theme: string
  midtermAnnounce1At: EpochTimeStamp
  midtermAnnounce2At: EpochTimeStamp
  assetbundleName: string
}

declare interface ICheerfulCarnivalTeam {
  id: number
  eventId: number
  seq: number
  teamName: string
  assetbundleName: string
}

declare interface IArea {
  id: number
  assetbundleName: string
  areaType: string
  viewType: string
  name: string
  label?: string
  startAt?: number
  endAt?: number
  releaseConditionId: number
}

declare interface IActionSet {
  id: number
  areaId: number
  scriptId: string
  characterIds: number[]
  scenarioId: string
  actionSetType: string
}

declare interface IVersionInfo {
  systemProfile: string
  appVersion: string
  multiPlayVersion: string
  dataVersion: string
  assetVersion: string
  appHash: string
  assetHash: string
  appVersionStatus: string
}

declare interface IListBucketResult {
  Name: string
  Prefix: string
  NextContinuationToken?: string
  CommonPrefixes?: {
    Prefix: string
  }[]
  Contents?: {
    Key: string
    LastModified: string
    Size: number
  }[]
}

declare interface IAssetListElement {
  path: string
  type: "folder" | "file" | "parent"
}

declare interface SpecialStoryEpisode {
  id: number
  specialStoryId: number
  episodeNo: number
  title: string
  specialStoryEpisodeType: string
  assetbundleName: string
  scenarioId: string
  releaseConditionId: number
  isAbleSkip: boolean
  rewardResourceBoxIds: number[]
  specialStoryEpisodeTypeId?: number
}

declare interface ISpecialStory {
  id: number
  seq: number
  title: string
  assetbundleName: string
  startAt: EpochTimeStamp
  endAt: EpochTimeStamp
  episodes: SpecialStoryEpisode[]
}

declare interface BondsHonorLevel {
  id: number
  bondsHonorId: number
  level: number
  description: string
}

declare interface IBondsHonor {
  id: number
  seq: number
  bondsGroupId: number
  gameCharacterUnitId1: number
  gameCharacterUnitId2: number
  honorRarity: string
  name: string
  description: string
  levels: BondsHonorLevel[]
}

declare interface IBondsHonorWord {
  id: number
  seq: number
  bondsGroupId: number
  assetbundleName: string
  name: string
  description: string
}

declare interface IBond {
  id: number
  groupId: number
  characterId1: number
  characterId2: number
}

declare interface IBondsReward {
  id: number
  bondsGroupId: number
  rank: number
  seq: number
  bondsRewardType: string
  resourceBoxId: number
  description: string
}

declare interface IEventRarityBonusRate {
  id: number
  cardRarityType: cardRarityType
  masterRank: number
  bonusRate: number
}

declare interface IMasterLessonCost {
  id: number
  cardRarityType: cardRarityType
  masterRank: number
  seq: number
  resourceType: string
  resourceId: number
  quantity: number
}

declare interface IMasterLesson {
  cardRarityType?: string
  cardRarity?: number
  masterRank: number
  power1BonusFixed: number
  power2BonusFixed: number
  power3BonusFixed: number
  characterRankExp: number
  costs: Cost[]
  rewards: any[]
}

declare interface IMasterLessonReward {
  id: number
  cardId: number
  masterRank: number
  seq: number
  resourceBoxId: number
  cardRarity: number
}

declare interface ICostume3D {
  id: number
  seq: number
  costume3dGroupId: number
  costume3dType: string
  name: string
  partType: string
  colorId: number
  colorName: string
  characterId: number
  costume3dRarity: string
  assetbundleName: string
  designer: string
  publishedAt: EpochTimeStamp
}

declare interface IEventMusic {
  eventId: number
  musicId: number
  seq: number
  releaseConditionId: number
}
