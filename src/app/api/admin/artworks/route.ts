import { NextRequest, NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'
import { auth } from '@/lib/auth'

// GET - List all artworks for admin (including pending, rejected)
export async function GET(request: NextRequest) {
  try {
    const session = await auth()

    if (!session?.user?.id) {
      return NextResponse.json(
        { error: 'Unauthorized' },
        { status: 401 }
      )
    }

    // Check if user is CEO
    const user = await prisma.user.findUnique({
      where: { id: session.user.id },
    })

    if (!user || user.role !== 'CEO') {
      return NextResponse.json(
        { error: 'Access denied. CEO only.' },
        { status: 403 }
      )
    }

    const { searchParams } = new URL(request.url)
    const status = searchParams.get('status')
    const limit = parseInt(searchParams.get('limit') || '100')
    const offset = parseInt(searchParams.get('offset') || '0')

    // Build where clause
    const where: Record<string, unknown> = {}

    if (status && status !== 'all') {
      where.status = status.toUpperCase()
    }

    const [artworks, total] = await Promise.all([
      prisma.artwork.findMany({
        where,
        include: {
          artist: {
            select: {
              id: true,
              displayName: true,
              profileImage: true,
            },
          },
        },
        orderBy: { createdAt: 'desc' },
        take: limit,
        skip: offset,
      }),
      prisma.artwork.count({ where }),
    ])

    return NextResponse.json({
      artworks: artworks.map((artwork) => ({
        id: artwork.id,
        title: artwork.title,
        description: artwork.description,
        price: Number(artwork.price),
        primaryImage: artwork.primaryImage,
        additionalImages: artwork.additionalImages,
        medium: artwork.medium,
        style: artwork.style,
        category: artwork.category,
        dimensions: artwork.dimensions,
        yearCreated: artwork.yearCreated,
        status: artwork.status,
        isAvailable: artwork.isAvailable,
        isFeatured: artwork.isFeatured,
        views: artwork.views,
        soldCount: artwork.soldCount,
        artist: artwork.artist,
        createdAt: artwork.createdAt,
        updatedAt: artwork.updatedAt,
      })),
      total,
    })
  } catch (error) {
    console.error('Error fetching artworks:', error)
    return NextResponse.json(
      { error: 'Failed to fetch artworks' },
      { status: 500 }
    )
  }
}

// PATCH - Update artwork status (approve/reject)
export async function PATCH(request: NextRequest) {
  try {
    const session = await auth()

    if (!session?.user?.id) {
      return NextResponse.json(
        { error: 'Unauthorized' },
        { status: 401 }
      )
    }

    // Check if user is CEO
    const user = await prisma.user.findUnique({
      where: { id: session.user.id },
    })

    if (!user || user.role !== 'CEO') {
      return NextResponse.json(
        { error: 'Access denied. CEO only.' },
        { status: 403 }
      )
    }

    const body = await request.json()
    const { artworkId, status, rejectionReason } = body

    if (!artworkId || !status) {
      return NextResponse.json(
        { error: 'Artwork ID and status are required' },
        { status: 400 }
      )
    }

    const validStatuses = ['PENDING', 'APPROVED', 'REJECTED', 'SOLD']
    if (!validStatuses.includes(status)) {
      return NextResponse.json(
        { error: 'Invalid status' },
        { status: 400 }
      )
    }

    const updateData: Record<string, unknown> = {
      status,
    }

    if (status === 'APPROVED') {
      updateData.approvedBy = user.id
      updateData.approvedAt = new Date()
      updateData.isAvailable = true
    } else if (status === 'REJECTED') {
      updateData.rejectedAt = new Date()
      updateData.rejectionReason = rejectionReason || 'No reason provided'
      updateData.isAvailable = false
    }

    const artwork = await prisma.artwork.update({
      where: { id: artworkId },
      data: updateData,
      include: {
        artist: {
          select: {
            id: true,
            displayName: true,
          },
        },
      },
    })

    return NextResponse.json({
      success: true,
      artwork: {
        id: artwork.id,
        title: artwork.title,
        status: artwork.status,
        artist: artwork.artist,
      },
    })
  } catch (error) {
    console.error('Error updating artwork:', error)
    return NextResponse.json(
      { error: 'Failed to update artwork' },
      { status: 500 }
    )
  }
}
