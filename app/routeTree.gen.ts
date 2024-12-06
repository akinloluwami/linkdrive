/* eslint-disable */

// @ts-nocheck

// noinspection JSUnusedGlobalSymbols

// This file was automatically generated by TanStack Router.
// You should NOT make any changes in this file as it will be overwritten.
// Additionally, you should also exclude this file from your linter and/or formatter to prevent it from being checked or modified.

// Import Routes

import { Route as rootRoute } from './routes/__root'
import { Route as AuthedImport } from './routes/_authed'
import { Route as IndexImport } from './routes/index'
import { Route as AuthedDashboardImport } from './routes/_authed/dashboard'
import { Route as AuthedDashboardIndexImport } from './routes/_authed/dashboard/index'
import { Route as AuthedDashboardCollectionsImport } from './routes/_authed/dashboard/collections'

// Create/Update Routes

const AuthedRoute = AuthedImport.update({
  id: '/_authed',
  getParentRoute: () => rootRoute,
} as any)

const IndexRoute = IndexImport.update({
  id: '/',
  path: '/',
  getParentRoute: () => rootRoute,
} as any)

const AuthedDashboardRoute = AuthedDashboardImport.update({
  id: '/dashboard',
  path: '/dashboard',
  getParentRoute: () => AuthedRoute,
} as any)

const AuthedDashboardIndexRoute = AuthedDashboardIndexImport.update({
  id: '/',
  path: '/',
  getParentRoute: () => AuthedDashboardRoute,
} as any)

const AuthedDashboardCollectionsRoute = AuthedDashboardCollectionsImport.update(
  {
    id: '/collections',
    path: '/collections',
    getParentRoute: () => AuthedDashboardRoute,
  } as any,
)

// Populate the FileRoutesByPath interface

declare module '@tanstack/react-router' {
  interface FileRoutesByPath {
    '/': {
      id: '/'
      path: '/'
      fullPath: '/'
      preLoaderRoute: typeof IndexImport
      parentRoute: typeof rootRoute
    }
    '/_authed': {
      id: '/_authed'
      path: ''
      fullPath: ''
      preLoaderRoute: typeof AuthedImport
      parentRoute: typeof rootRoute
    }
    '/_authed/dashboard': {
      id: '/_authed/dashboard'
      path: '/dashboard'
      fullPath: '/dashboard'
      preLoaderRoute: typeof AuthedDashboardImport
      parentRoute: typeof AuthedImport
    }
    '/_authed/dashboard/collections': {
      id: '/_authed/dashboard/collections'
      path: '/collections'
      fullPath: '/dashboard/collections'
      preLoaderRoute: typeof AuthedDashboardCollectionsImport
      parentRoute: typeof AuthedDashboardImport
    }
    '/_authed/dashboard/': {
      id: '/_authed/dashboard/'
      path: '/'
      fullPath: '/dashboard/'
      preLoaderRoute: typeof AuthedDashboardIndexImport
      parentRoute: typeof AuthedDashboardImport
    }
  }
}

// Create and export the route tree

interface AuthedDashboardRouteChildren {
  AuthedDashboardCollectionsRoute: typeof AuthedDashboardCollectionsRoute
  AuthedDashboardIndexRoute: typeof AuthedDashboardIndexRoute
}

const AuthedDashboardRouteChildren: AuthedDashboardRouteChildren = {
  AuthedDashboardCollectionsRoute: AuthedDashboardCollectionsRoute,
  AuthedDashboardIndexRoute: AuthedDashboardIndexRoute,
}

const AuthedDashboardRouteWithChildren = AuthedDashboardRoute._addFileChildren(
  AuthedDashboardRouteChildren,
)

interface AuthedRouteChildren {
  AuthedDashboardRoute: typeof AuthedDashboardRouteWithChildren
}

const AuthedRouteChildren: AuthedRouteChildren = {
  AuthedDashboardRoute: AuthedDashboardRouteWithChildren,
}

const AuthedRouteWithChildren =
  AuthedRoute._addFileChildren(AuthedRouteChildren)

export interface FileRoutesByFullPath {
  '/': typeof IndexRoute
  '': typeof AuthedRouteWithChildren
  '/dashboard': typeof AuthedDashboardRouteWithChildren
  '/dashboard/collections': typeof AuthedDashboardCollectionsRoute
  '/dashboard/': typeof AuthedDashboardIndexRoute
}

export interface FileRoutesByTo {
  '/': typeof IndexRoute
  '': typeof AuthedRouteWithChildren
  '/dashboard/collections': typeof AuthedDashboardCollectionsRoute
  '/dashboard': typeof AuthedDashboardIndexRoute
}

export interface FileRoutesById {
  __root__: typeof rootRoute
  '/': typeof IndexRoute
  '/_authed': typeof AuthedRouteWithChildren
  '/_authed/dashboard': typeof AuthedDashboardRouteWithChildren
  '/_authed/dashboard/collections': typeof AuthedDashboardCollectionsRoute
  '/_authed/dashboard/': typeof AuthedDashboardIndexRoute
}

export interface FileRouteTypes {
  fileRoutesByFullPath: FileRoutesByFullPath
  fullPaths: '/' | '' | '/dashboard' | '/dashboard/collections' | '/dashboard/'
  fileRoutesByTo: FileRoutesByTo
  to: '/' | '' | '/dashboard/collections' | '/dashboard'
  id:
    | '__root__'
    | '/'
    | '/_authed'
    | '/_authed/dashboard'
    | '/_authed/dashboard/collections'
    | '/_authed/dashboard/'
  fileRoutesById: FileRoutesById
}

export interface RootRouteChildren {
  IndexRoute: typeof IndexRoute
  AuthedRoute: typeof AuthedRouteWithChildren
}

const rootRouteChildren: RootRouteChildren = {
  IndexRoute: IndexRoute,
  AuthedRoute: AuthedRouteWithChildren,
}

export const routeTree = rootRoute
  ._addFileChildren(rootRouteChildren)
  ._addFileTypes<FileRouteTypes>()

/* ROUTE_MANIFEST_START
{
  "routes": {
    "__root__": {
      "filePath": "__root.tsx",
      "children": [
        "/",
        "/_authed"
      ]
    },
    "/": {
      "filePath": "index.tsx"
    },
    "/_authed": {
      "filePath": "_authed.tsx",
      "children": [
        "/_authed/dashboard"
      ]
    },
    "/_authed/dashboard": {
      "filePath": "_authed/dashboard.tsx",
      "parent": "/_authed",
      "children": [
        "/_authed/dashboard/collections",
        "/_authed/dashboard/"
      ]
    },
    "/_authed/dashboard/collections": {
      "filePath": "_authed/dashboard/collections.tsx",
      "parent": "/_authed/dashboard"
    },
    "/_authed/dashboard/": {
      "filePath": "_authed/dashboard/index.tsx",
      "parent": "/_authed/dashboard"
    }
  }
}
ROUTE_MANIFEST_END */
