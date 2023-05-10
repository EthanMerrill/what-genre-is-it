
import React, { useState } from 'react'
import Turnstone from 'turnstone'
import SplitMatch from 'split-match'
import RecentSearchesPlugin from 'turnstone-recent-searches'
import Icon from '../icon'

// Tailwind classes for Turnstone elements
const styles = {
  input: 'w-full h-12 border border-crystal-400 py-2 pl-10 pr-9 text-xl text-oldsilver-800 outline-none rounded-md',
  inputFocus: 'w-full h-12 border-x-0 border-t-0 border-b border-crystal-500 py-2 pl-10 pr-9 text-xl text-oldsilver-800 outline-none sm:rounded-md sm:border',
  query: 'text-oldsilver-800 placeholder-oldsilver-400',
  typeahead: 'text-oldsilver-400 border-white',
  cancelButton: `absolute w-10 h-12 inset-y-0 left-0 items-center justify-center z-10 text-crystal-600 inline-flex sm:hidden`,
  clearButton: 'absolute inset-y-0 right-0 w-10 inline-flex items-center justify-center text-crystal-500 hover:text-hotpink-300',
  listbox: 'w-full bg-white sm:border sm:border-crystal-500 sm:rounded-md text-left sm:mt-2 p-2 sm:drop-shadow-xl',
  groupHeading: 'cursor-default mt-2 mb-0.5 px-1.5 uppercase text-sm text-hotpink-500',
  item: 'cursor-pointer p-1.5 text-lg whitespace-nowrap text-ellipsis overflow-hidden text-oldsilver-700',
  highlightedItem: 'cursor-pointer p-1.5 text-lg whitespace-nowrap sm:text-ellipsis overflow-hidden text-oldsilver-700 rounded-md bg-gradient-to-t from-crystal-100 to-white',
  noItems: 'cursor-default text-center my-20'
}

// The maximum number of items we want to show in the list
const maxItems = 10

// Set up listbox contents. We are fetching cities and airports from two different
// API endpoints. 10 from each but ideally we only want to show 8 cities and 2 airports.
const listbox = [
  {
    id: 'city',
    name: 'Cities',
    ratio: 8,
    displayField: 'name',
    data: (query) =>
      fetch(`/api/cities?q=${encodeURIComponent(query)}&limit=${maxItems}`)
        .then(response => response.json()),
    searchType: 'startswith'
  },
  {
    id: 'airport',
    name: 'Airports',
    ratio: 2,
    displayField: 'name',
    data: (query) =>
      fetch(`/api/airports?q=${encodeURIComponent(query)}&limit=${maxItems}`)
        .then(response => response.json()),
    searchType: 'contains'
  }
]

// Custom Item component
const Item = (props) => {
  const {
    appearsInDefaultListbox,
    index,
    item,
    query,
    searchType = 'startswith',
    setSelected,
    totalItems
  } = props

  const globalMatch = searchType === 'contains'
  const iconType = item.icon || item.type
  const SplitComponent = (props) => {
    const { children, index: splitIndex} = props
    const doubleLine = index === 0 && !appearsInDefaultListbox
    const fontWeight = appearsInDefaultListbox
      ? 'font-light'
      : totalItems === 1
        ? 'font-semibold'
        : (searchType === 'startswith' ? 'font-semibold' : 'font-light')
    const display = doubleLine ? 'block' : 'inline'
    const lineHeight = doubleLine ? 'leading-6' : ''
    const textSize = doubleLine
      ? (splitIndex === 1 ? 'text-base' : 'text-xl')
      : (splitIndex === 1 ? 'text-sm' : 'text-lg')
    const className = `${display} ${fontWeight} ${textSize} ${lineHeight}`
    return <span className={className}>{children}</span>
  }

  const MatchComponent = (props) => {
    const { children } = props
    const className = appearsInDefaultListbox
      ? 'font-light'
      : totalItems === 1
        ? 'font-semibold'
        : (searchType === 'startswith' ? 'font-light' : 'font-semibold')
    return <span className={className}>{children}</span>
  }

  const matchedText = (includeSeparator) => {
    return (
     <SplitMatch
        searchText={query}
        globalMatch={globalMatch}
        globalSplit={false}
        includeSeparator={includeSeparator}
        MatchComponent={MatchComponent}
        SplitComponent={SplitComponent}>{item.name}</SplitMatch>
    )
  }

  const SubLocations = () => {
    if(totalItems <= 5 && (item.neighbourhoods || item.attractions)) {
      const neighbourhoods = (totalItems > 1) ? item.neighbourhoods.slice(0,5) : item.neighbourhoods
      const attractions = (totalItems > 1) ? item.attractions.slice(0,5) : item.attractions

      return (
        <div className="whitespace-normal pl-4 my-1">
          <SubLocationList title="Neighbourhoods" data={neighbourhoods} />
          <SubLocationList title="Attractions" data={attractions} />
        </div>
      )
    }
    return null
  }

  const SubLocationList = (props) => {
    const { title, data } = props

    if(!data || !data.length) return null

    return (
      <div className="align-top pl-6 mb-2 inline-block">
        <div className="cursor-default my-0.5 pl-2.5 uppercase text-xs sm:text-sm text-hotpink-300">{title}</div>
        <>
          {data.map((value, index) =>
            <SubLocation
              key={`neighbourhood${index}`}
              value={value}>
                {value.name.split(',')[0]}
            </SubLocation>
          )}
        </>
      </div>
    )
  }

  const SubLocation = (props) => {
    const { children, value } = props

    const handleClick = (evt, value) => {
      evt.stopPropagation()
      setSelected(value, 'name')
    }

    return (
      <div>
        <div className="px-2.5 py-0.5 text-sm text-crystal-600 hover:rounded-md hover:text-white hover:bg-crystal-600" onMouseDown={(evt) => handleClick(evt, value)}>
          {children}
        </div>
      </div>
    )
  }

  const firstItem = () => {
    return (
      <>
        <div className="inline-block w-10 mr-2.5 text-cerulean-600">
          <Icon type={iconType} className="h-10 w-10" />
        </div>
        <div className="inline-block text-oldsilver-600">{matchedText(false)}</div>
        {SubLocations()}
      </>
    )
  }

  const standardItem = () => {
    return (
      <>
        <div className="inline-block w-10 mr-2.5 text-center align-middle text-cerulean-600">
          <Icon type={iconType} className="h-7 w-10" />
        </div>
        <span className="align-middle text-oldsilver-600">
          {matchedText(true)}
        </span>
      </>
    )
  }

  return index === 0 && !appearsInDefaultListbox ? firstItem() : standardItem()
}

const Cancel = () => <Icon type="cancel" className="w-8 h-8" />
const Clear = () => <Icon type="clear" className="w-6 h-6" />

export default function SuperfancyExample() {
  const [hasFocus, setHasFocus] = useState(false)

  // Style the container so on mobile devices the search box and results
  // take up the whole screen
  const containerStyles = hasFocus
    ? 'fixed block w-full h-full top-0 left-0 bg-white z-50 overflow-auto sm:relative sm:w-6/12 sm:h-auto sm:top-auto sm:left-auto sm:bg-transparent sm:z-auto sm:overflow-visible'
    : 'relative w-11/12 sm:w-6/12'

  const iconDisplayStyle = hasFocus ? 'hidden text-crystal-600' : 'inline-flex text-crystal-500'

  const onBlur = () => setHasFocus(false)
  const onFocus = () => setHasFocus(true)

  return (
    <div className={containerStyles}>
      <span className={`absolute w-10 h-12 inset-y-0 left-0 items-center justify-center z-10 sm:inline-flex ${iconDisplayStyle}`}>
        <Icon type="search" className="w-6 h-6" />
      </span>
      <Turnstone
        cancelButton={true}
        clearButton={true}
        debounceWait={250}
        id="autocomplete"
        listbox={listbox}
        listboxIsImmutable={true}
        matchText={true}
        maxItems={maxItems}
        noItemsMessage="We found no places that match your search"
        onBlur={onBlur}
        onFocus={onFocus}
        placeholder="Enter a city or airport"
        plugins={[[RecentSearchesPlugin, {storageKey: 'turnstoneExample2'}]]}
        styles={styles}
        Cancel={Cancel}
        Clear={Clear}
        Item={Item}
      />
    </div>
  )
}
