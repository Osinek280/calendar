"use client"

import React from 'react'
import { HexColorPicker } from 'react-colorful'
import { Card, CardContent } from '@/components/ui/card'
import { Label } from '@/components/ui/label'
import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'

interface ColorPickerProps {
  color: string
  onChange: (color: string) => void
}

const exampleColors = [
  { name: 'Chart 1', value: '#e45742' },
  { name: 'Chart 2', value: '#279e7d' },
  { name: 'Chart 3', value: '#365d6a' },
  { name: 'Chart 4', value: '#edc85e' },
  { name: 'Chart 5', value: '#f6a734' },
];


export function ColorPicker({ color, onChange }: ColorPickerProps) {
  return (
    <Card className="w-full">
      <CardContent className="p-6">
        <div className="flex space-x-4">
          <div className="space-y-4">
            <div className="flex items-center space-x-4">
              <HexColorPicker color={color} onChange={onChange}  style={{ width: '200px', height: '100px' }} />
              <div className="flex-grow">
                <Label htmlFor="hex-input" className="text-sm font-medium">
                  Hex Color
                </Label>
                <Input
                  id="hex-input"
                  value={color}
                  onChange={(e) => onChange(e.target.value)}
                  className="mt-1"
                />
              </div>
            </div>
            <div>
              <Label className="text-sm font-medium mb-2 block">Example Colors</Label>
              <div className="grid grid-cols-5 gap-2">
                {exampleColors.map((exampleColor) => (
                  <Button
                    key={exampleColor.name}
                    variant="outline"
                    className="w-full h-8 p-0"
                    style={{ backgroundColor: exampleColor.value }}
                    onClick={(e) => {
                      e.preventDefault()
                      onChange(exampleColor.value)
                    } 
                    }
                    title={exampleColor.name}
                  />
                ))}
              </div>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}

