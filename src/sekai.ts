const DOMReady = new Promise<void>((resolve: ((..._: any) => void)) => {
  if (document.readyState !== "loading") return resolve()
  //else
  return document.addEventListener("DOMContentLoaded", resolve)
})

enum unitAbbreviation {
  light_sound = "LEO",
  idol = "MMJ",
  street = "VBS",
  theme_park = "WxS",
  school_refusal = "N25",
  piapro = "PIA"
}
enum attrAbbreviation {
  cute = "CU",
  cool = "CO",
  pure = "PU",
  happy = "HA",
  mysterious = "MY"
}
enum attrColors {
  cute = "Pink",
  cool = "SkyBlue",
  pure = "MediumSpringGreen",
  happy = "Orange",
  mysterious = "MediumPurple"
}
enum gachaCardRarityRateGroupId {
  Normal = 1,
  ThreeStarPlus = 2,
  Festa = 3,
  Birthday = 4,
  WishFesta = 5
}
type PropsOfType<T, U> = keyof { [K in keyof T as T[K] extends U ? K : never]: T[K] }
type PropsOfTypeNotAny<T, U> = Exclude<PropsOfType<T, U>, PropsOfType<T, null>>

class crossOriginImage extends HTMLImageElement {
  constructor() {
    super()
    this.referrerPolicy = "no-referrer"
    this.decoding = "async"
    this.loading = "lazy"
  }
}; customElements.define("co-img", crossOriginImage, { extends: "img" })

const localStorageAvailable = ((type: PropsOfTypeNotAny<Window, Storage>) => {
  let storage
  try {
    storage = window[type]
    const x = "__storage_test__"
    storage.setItem(x, x)
    storage.removeItem(x)
    return true
  } catch (e) {
    return (
      e instanceof DOMException &&
      // everything except Firefox
      (e.code === 22 ||
        // Firefox
        e.code === 1014 ||
        // test name field too, because code might not be present
        // everything except Firefox
        e.name === "QuotaExceededError" ||
        // Firefox
        e.name === "NS_ERROR_DOM_QUOTA_REACHED") &&
      // acknowledge QuotaExceededError only if there's something already stored
      storage &&
      storage.length !== 0
    ) as boolean
  }
})("localStorage")

const JSONfetchInit: RequestInit = {
  headers: {
    "Accept": "application/json"
  },
  method: "GET",
  referrerPolicy: "no-referrer"
}



function sekaiDbJsonFetch<T, const D extends readonly Promise<unknown>[] = readonly []>(input: RequestInfo | URL, callback?: (data: [T, ...{ -readonly [P in keyof D]: Awaited<D[P]> }]) => T, deps?: D): Promise<T>
function sekaiDbJsonFetch<T, const D extends readonly Promise<unknown>[] = readonly []>(input: RequestInfo | URL, callback: (data: [T, ...{ -readonly [P in keyof D]: Awaited<D[P]> }]) => T = (([data, ...args]) => { return data }), deps: D = [] as unknown as D): Promise<T> {
  const loaded = fetch(input, {
    headers: {
      "Accept": "application/json"
    },
    method: "GET",
    referrerPolicy: "no-referrer"
  }).then(
    (response) => { return response.json() as Promise<T> }, (reason) => {
      console.error(`${input} failed to load!`, "\n", reason); return Promise.reject(reason)
  })
  return Promise.all([loaded, ...[...deps]] as const).then(callback)
}

const tableRows = new Set<HTMLTableRowElement & { sekaiEvent?: IEventInfo, pickupCards?: Set<ICardInfo>, sekaiGacha?: IGachaInfo }>

function generateCardLink(card: ICardInfo, gameCharacters: IGameChara[], appendRarity: boolean = card.cardRarityType === "rarity_4" || card.cardRarityType === "rarity_birthday" ? false : true) {
  const gameCharacter = gameCharacters[card.characterId - 1]
  const cardLink = document.createElement("a")
  cardLink.href = `https://sekai.best/card/${card.id}`
  cardLink.innerText = attrAbbreviation[card.attr] +
    '\xa0'/*&nbsp;*/ +
    (card.supportUnit === "none" ? "" : unitAbbreviation[card.supportUnit]) +
    gameCharacter.givenName.toLowerCase() +
    (appendRarity ? card.cardRarityType.split("_")[1] : "")
  cardLink.classList.add("hoverpreview", "card")
  const cardArtBase = "https://storage.sekai.best/sekai-jp-assets/character/member/"
  const div = document.createElement("div")
  cardLink.addEventListener("pointerover", () => {
    const normal = document.createElement("img", { is: "co-img" })
    normal.src = cardArtBase + card.assetbundleName + "/card_normal.webp"
    div.appendChild(normal)
    if (card.specialTrainingCosts.length !== 0) {
      const trained = document.createElement("img", { is: "co-img" })
      trained.src = cardArtBase + card.assetbundleName + "/card_after_training.webp"
      div.appendChild(trained)
    }
    cardLink.appendChild(div)
  }, { once: true })


  return cardLink
}

// avoid race condition with a gacha ending while the page is loading
const globalNow: EpochTimeStamp = Date.now()

const eventsTable = document.createElement("table")


function calcOffset<T extends { [key in K]: number }, K extends keyof T>(jps: T[], ens: T[], id: keyof T, offsetProperty: K) {
  const future_ens = ens.filter(event_en => event_en[offsetProperty] > globalNow).sort((a, b) => b[offsetProperty] - a[offsetProperty]) //sorts descending
  return (future_ens.reduce<number | null>((offset, en) => {
    if (offset !== null) return offset
    const nextEvent = jps.find(jp => jp[id] === en[id])
    return nextEvent ? en[offsetProperty] - nextEvent[offsetProperty] : null
  }, null) ?? 31556926000) /* unix year in ms */
}

const fetches = (() => {
  const gameCharacters: Promise<IGameChara[]> = sekaiDbJsonFetch("https://headsetruler.com/assets/json/gameCharacters.json")
  const gameCharacterUnits: Promise<IGameCharaUnit[]> = sekaiDbJsonFetch("https://headsetruler.com/assets/json/gameCharacterUnits.json")
  const eventCards: Promise<IEventCard[]> = sekaiDbJsonFetch("https://raw.githubusercontent.com/Sekai-World/sekai-master-db-diff/main/eventCards.json")
  const eventDeckBonuses: Promise<IEventDeckBonus[]> = sekaiDbJsonFetch("https://raw.githubusercontent.com/Sekai-World/sekai-master-db-diff/main/eventDeckBonuses.json")
  const cards: Promise<ICardInfo[]> = sekaiDbJsonFetch("https://raw.githubusercontent.com/Sekai-World/sekai-master-db-diff/main/cards.json")
  const events_en: Promise<IEventInfo[]> = sekaiDbJsonFetch("https://raw.githubusercontent.com/Sekai-World/sekai-master-db-en-diff/main/events.json")
  const events: Promise<IEventInfo[]> = sekaiDbJsonFetch("https://raw.githubusercontent.com/Sekai-World/sekai-master-db-diff/main/events.json", ([events, eventCards, eventDeckBonuses, cards, events_en, gameCharacterUnits, gameCharacters]) => {
    const offsetNow = globalNow - calcOffset(events, events_en, "id", "closedAt")
    events.filter(event => {
      const en_closedAt = events_en.find(event_en => event_en.id === event.id)?.closedAt
      return en_closedAt ? en_closedAt > globalNow : event.closedAt > offsetNow
    }).forEach(event => {
      const en = events_en.find(event_en => event_en.id === event.id);
      [event.closedAt, event.startAt] = en ? [en.closedAt, en.startAt] : [event.closedAt, event.startAt].map(timestamp => timestamp + (globalNow - offsetNow))

      const eventRow = Object.assign(document.createElement("tr"), { sekaiEvent: event })
      eventRow.id = "e" + event.id

      // cell 1: event ID
      const eventIdCell = eventRow.insertCell()
      eventIdCell.appendChild(
        Object.assign(document.createElement("a"),
          {
            href: `https://sekai.best/event/${event.id}`,
            innerText: event.id.toString()
          } as Partial<HTMLAnchorElement>))
      eventIdCell.firstElementChild!.classList.add("hoverpreview", "event")
      eventIdCell.style.textAlign = "center"

      // cell 2: event type
      const eventTypeCell = eventRow.insertCell()
      switch (event.eventType) {
        case "cheerful_carnival":
          eventTypeCell.innerText = "C"
          break;
        case "world_bloom":
          eventTypeCell.innerText = "W"
          break;
      }
      eventTypeCell.style.textAlign = "center"

      // cell 3: event bonus characters/unit
      const eventBonusCell = eventRow.insertCell()
      const eventBonusCellContent = new Set<string>()
      let eventAttr: attr | undefined = undefined

      if (event.unit !== "none") { // single-unit event
        if (event.eventType == "world_bloom") { eventBonusCellContent.add(unitAbbreviation[event.unit]) }
        else {
        eventAttr = (eventDeckBonuses.find((eventDeckBonus): eventDeckBonus is IEventDeckBonus & {
          cardAttr: attr
        } =>
          eventDeckBonus.eventId === event.id &&
          eventDeckBonus.cardAttr !== undefined
        )!.cardAttr)
        eventBonusCellContent.add(attrAbbreviation[eventAttr] + '\xa0'/*&nbsp;*/ + unitAbbreviation[event.unit])
        }
      } else { // mixed-unit event
        eventDeckBonuses.filter((eventDeckBonus): eventDeckBonus is IEventDeckBonus & {
          cardAttr: attr, gameCharacterUnitId: gameCharacterUnitId
        } =>
          eventDeckBonus.eventId === event.id &&
          eventDeckBonus.cardAttr !== undefined &&
          /*side-effect*/(() => { eventAttr = eventDeckBonus.cardAttr; eventBonusCellContent.add(attrAbbreviation[eventAttr] + '\n'); return true })() &&
          eventDeckBonus.gameCharacterUnitId !== undefined)
          .forEach(eventDeckBonus => {
            const gameCharacterUnit = gameCharacterUnits[eventDeckBonus.gameCharacterUnitId - 1]
            eventBonusCellContent.add((eventDeckBonus.gameCharacterUnitId > 20 ? unitAbbreviation[gameCharacterUnit.unit] : "") + gameCharacters[gameCharacterUnit.gameCharacterId - 1].givenName.toLowerCase())
          })
      }
      eventBonusCell.innerText = [...eventBonusCellContent].join(' ')
      eventBonusCell.style.textAlign = "center"
      eventBonusCell.style.backgroundColor = eventAttr !== undefined ? attrColors[eventAttr] : ""

      const pickupCards = new Set<ICardInfo>()
      const exchangeCards = new Set<ICardInfo>()
      eventCards.filter(eventCard => eventCard.eventId === event.id).map(eventCard => cards.find(card => card.id === eventCard.cardId)).forEach(card => {
        if (!card) return
        card.cardRarityType === "rarity_4" ? pickupCards.add(card) : exchangeCards.add(card)
      })

      // cell 4: event exchange
      const eventExchangeCell = eventRow.insertCell()
      eventExchangeCell.append(...[...exchangeCards].map((card, i, exchangeCards) => {
        const cardLink = generateCardLink(card, gameCharacters)
        return i < exchangeCards.length - 1 ? [cardLink, document.createElement("br")] : [cardLink]
      }).flat(1))
      eventExchangeCell.style.textAlign = "center"


      // cell 5: gacha
      // cell 6: gacha pickup
      // we don't create those in here, that happens in the gacha callback
      // we do feed them the pickups
      Object.assign(eventRow, { pickupCards })


      tableRows.add(eventRow)
      /* const bonusCards = eventDeckBonuses.filter(eventDeckBonus => eventDeckBonus.eventId === event.id).reduce((bonusCards, eventDeckBonus) => {
        cards.filter(card => (
          card.attr === eventDeckBonus.cardAttr || card.characterId === eventDeckBonus.gameCharacterUnitId || gameCharacterUnits.find(gameCharacterUnit => gameCharacterUnit.unit === card.supportUnit && gameCharacterUnit.gameCharacterId === card.characterId)?.gameCharacterId === eventDeckBonus.gameCharacterUnitId)
        ).forEach(card => bonusCards.add(card))
        return bonusCards
      }, new Set<ICardInfo>()) */
    })
    return events
  }, [eventCards, eventDeckBonuses, cards, events_en, gameCharacterUnits, gameCharacters])
  const gachas_en: Promise<IGachaInfo[]> = sekaiDbJsonFetch("https://raw.githubusercontent.com/Sekai-World/sekai-master-db-en-diff/main/gachas.json")
  const gachas: Promise<IGachaInfo[]> = sekaiDbJsonFetch("https://raw.githubusercontent.com/Sekai-World/sekai-master-db-diff/main/gachas.json", ([gachas, gachas_en, events, events_en, cards, gameCharacters]) => {
    const offsetNow = globalNow - calcOffset(gachas, gachas_en, "id", "startAt")
    const eventRows = [...tableRows].filter((tableRow): tableRow is HTMLTableRowElement & { sekaiEvent: IEventInfo, pickupCards: Set<ICardInfo> } => {
      return Object.getOwnPropertyNames(tableRow).includes("pickupCards")
    })
    gachas.filter(gacha => {
      const en_endAt = gachas_en.find(gacha_en => gacha_en.id === gacha.id)?.endAt
      return en_endAt ? en_endAt > globalNow : gacha.endAt > offsetNow
    }).forEach(gacha => {
      const en = gachas_en.find(gacha_en => gacha_en.id === gacha.id);
      [gacha.endAt, gacha.startAt] = en ? [en.endAt, en.startAt] : [gacha.endAt, gacha.startAt].map(timestamp => timestamp + (globalNow - offsetNow))
      // skip paid gachas
      if (gacha.gachaBehaviors.every(behavior => behavior.costResourceType === "paid_jewel" || behavior.gachaSpinnableType === "colorful_pass")) return

      //flag birthdays
      const isBirthday = gacha.gachaCardRarityRateGroupId === gachaCardRarityRateGroupId.Birthday

      //flag festas
      const festaParent = gacha.gachaCardRarityRateGroupId === gachaCardRarityRateGroupId.Festa || gacha.gachaCardRarityRateGroupId === gachaCardRarityRateGroupId.WishFesta ? gachas.find(festaParent =>
        festaParent.gachaCardRarityRateGroupId === gachaCardRarityRateGroupId.Normal &&
        festaParent.gachaCeilItemId === gacha.gachaCeilItemId) : undefined

      const gachaRow:
        HTMLTableRowElement &
        {
          sekaiEvent?: IEventInfo,
          pickupCards: Set<ICardInfo>,
          sekaiGacha: IGachaInfo
        } = Object.assign(((gacha.gachaCardRarityRateGroupId === gachaCardRarityRateGroupId.Normal && gacha.gachaType === "ceil") ? eventRows.find(eventRow => {
          if (eventRow.sekaiEvent.startAt > gacha.endAt || eventRow.sekaiEvent.closedAt < gacha.startAt) return false
          const eventPickupCards = eventRow.pickupCards
          return gacha.gachaPickups.every(gachaPickup =>
            [...eventPickupCards].some(pickupCard =>
              pickupCard.id === gachaPickup.cardId
            )
          )
        }) : undefined) || document.createElement("tr"), {
          sekaiGacha: gacha,
          pickupCards: new Set<ICardInfo>(gacha.gachaPickups.map(gachaPickup =>
            cards.find(card => card.id === gachaPickup.cardId)!
          ))
        })
      if (festaParent) {
        //cell 1-4: FESTA
        const typeCell = gachaRow.insertCell()
        typeCell.colSpan = 4
        typeCell.innerText = "FESTA"
        typeCell.style.textAlign = "center"
        typeCell.style.fontWeight = "bold"
        typeCell.style.fontSize = "5em"
      }
      else if (!gachaRow.sekaiEvent) {

        //cell 1-4: Type
        const typeCell = gachaRow.insertCell()
        typeCell.colSpan = 4
        typeCell.innerText = isBirthday ? "Birthday" : ""
        typeCell.innerText += gacha.name.includes("復刻") ? (isBirthday ? " " : "" + "Reprint") : ""
        typeCell.style.textAlign = "right"
        typeCell.style.fontWeight = "bold"
      }

      // cell 5: gacha
      const gachaCell = gachaRow.insertCell()
      gachaCell.appendChild(
        Object.assign(document.createElement("a"),
          {
            href: `https://sekai.best/gacha/${gacha.id}`,
            innerText: gacha.id.toString() + (festaParent ? "\xa0F" : gachaRow.sekaiEvent?.eventType === "cheerful_carnival" ? "\xa0L" : "")
          } as Partial<HTMLAnchorElement>))
      gachaCell.firstElementChild!.classList.add("hoverpreview", "gacha")

      // cell 6: Pick-Up
      const pickupCell = gachaRow.insertCell()
      pickupCell.append(...[...gachaRow.pickupCards].map((card, i, pickupCards) => {
        const cardLink = generateCardLink(card, gameCharacters)
        return i < pickupCards.length - 1 ? [cardLink, document.createElement("br")] : [cardLink]
      }).flat(1))
      pickupCell.style.textAlign = "center"


      tableRows.add(gachaRow)
    })

    eventsTable.createTBody().append(...[...tableRows].sort((a, b) => {
      return (a.sekaiGacha?.startAt || a.sekaiEvent?.startAt || 0) -
        (b.sekaiGacha?.startAt || b.sekaiEvent?.startAt || 0) + (a.sekaiGacha?.id || 0) - (b.sekaiGacha?.id || 0)
    }) as HTMLTableRowElement[])

    return gachas
  }, [gachas_en, events, events_en, cards, gameCharacters])

  return [
    events,
    gachas,
    eventCards,
    eventDeckBonuses,
    gameCharacterUnits,
    cards,
    gameCharacters
  ] as const
})()







Promise.all([DOMReady, fetches["1"]]).then(([_, data]) => {
  eventsTable.createTHead().insertRow(0).replaceChildren(...(() => {
    const row = new Array<Node>()
    for (const header of ["Event\xa0№", "Type", "Bonus", "Exchange", "Gacha", "Pick-Up"] as const) {
      const th = document.createElement("th")
      th.innerText = header
      th.scope = "col"
      if (header !== "Gacha") th.style.textAlign = "center"
      row.push(th)
    }
    return row
  })())
  document.getElementById("event-table")?.replaceChildren(eventsTable)
})
