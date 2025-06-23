export type Pokimons = {
  count: number
  next: string
  previous: string,
  results: PokimonsResult[]
}

export type PokimonsResult = {
  name: string,
  url: string
}
