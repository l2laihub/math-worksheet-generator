#!/usr/bin/env python3
"""
Hybrid Math Worksheet Generator
Combines built-in vector graphics with optional OpenMoji support.
Works immediately with built-in graphics, enhanced with OpenMoji if available.
"""

import sys
import argparse
from reportlab.lib.pagesizes import letter
from reportlab.lib.units import inch
from reportlab.pdfgen import canvas
from reportlab.lib import colors
from reportlab.lib.utils import ImageReader
import math
import random
import os
from pathlib import Path


class VectorGraphicsLibrary:
    """Comprehensive library of hand-drawn vector objects"""
    
    @staticmethod
    def draw_apple(c, x, y, size=20):
        """Draw an apple"""
        c.setFillColor(colors.HexColor('#FF4444'))
        c.circle(x, y, size, fill=1, stroke=1)
        c.setStrokeColor(colors.HexColor('#8B4513'))
        c.setLineWidth(2)
        c.line(x, y + size, x, y + size + 5)
        c.setFillColor(colors.HexColor('#228B22'))
        path = c.beginPath()
        path.moveTo(x, y + size + 5)
        path.curveTo(x + 5, y + size + 8, x + 8, y + size + 5, x + 8, y + size + 2)
        path.curveTo(x + 8, y + size, x + 5, y + size, x, y + size + 5)
        c.drawPath(path, fill=1, stroke=1)
        c.setFillColor(colors.black)
        c.setStrokeColor(colors.black)
    
    @staticmethod
    def draw_banana(c, x, y, size=20):
        """Draw a banana"""
        c.setFillColor(colors.HexColor('#FFE135'))
        path = c.beginPath()
        path.moveTo(x - size*0.8, y + size*0.3)
        path.curveTo(x - size*0.5, y + size*0.8, x + size*0.5, y + size*0.5, x + size*0.8, y - size*0.3)
        path.curveTo(x + size*0.6, y - size*0.5, x - size*0.3, y - size*0.2, x - size*0.8, y + size*0.3)
        c.drawPath(path, fill=1, stroke=1)
        c.setFillColor(colors.black)
    
    @staticmethod
    def draw_orange(c, x, y, size=20):
        """Draw an orange"""
        c.setFillColor(colors.HexColor('#FF8C00'))
        c.circle(x, y, size, fill=1, stroke=1)
        c.setFillColor(colors.HexColor('#228B22'))
        c.circle(x, y + size, 3, fill=1, stroke=1)
        c.setFillColor(colors.black)
    
    @staticmethod
    def draw_strawberry(c, x, y, size=20):
        """Draw a strawberry"""
        c.setFillColor(colors.HexColor('#FF1744'))
        path = c.beginPath()
        path.moveTo(x, y - size)
        path.curveTo(x - size*0.7, y - size*0.5, x - size*0.7, y + size*0.3, x, y + size*0.6)
        path.curveTo(x + size*0.7, y + size*0.3, x + size*0.7, y - size*0.5, x, y - size)
        c.drawPath(path, fill=1, stroke=1)
        c.setFillColor(colors.HexColor('#FFFF00'))
        for dot_y in [y - size*0.5, y, y + size*0.3]:
            for dot_x in [x - size*0.3, x, x + size*0.3]:
                c.circle(dot_x, dot_y, 1.5, fill=1, stroke=0)
        c.setFillColor(colors.HexColor('#228B22'))
        for i in range(-1, 2):
            path = c.beginPath()
            path.moveTo(x + i*size*0.3, y - size)
            path.lineTo(x + i*size*0.4, y - size - 5)
            path.lineTo(x + i*size*0.2, y - size)
            c.drawPath(path, fill=1, stroke=0)
        c.setFillColor(colors.black)
    
    @staticmethod
    def draw_cookie(c, x, y, size=20):
        """Draw a cookie"""
        c.setFillColor(colors.HexColor('#D2691E'))
        c.circle(x, y, size, fill=1, stroke=1)
        c.setFillColor(colors.HexColor('#4B2F23'))
        chip_positions = [(x - size*0.4, y + size*0.3), (x + size*0.3, y + size*0.4),
                         (x - size*0.2, y - size*0.3), (x + size*0.4, y - size*0.2), (x, y)]
        for chip_x, chip_y in chip_positions:
            c.circle(chip_x, chip_y, 3, fill=1, stroke=0)
        c.setFillColor(colors.black)
    
    @staticmethod
    def draw_pizza(c, x, y, size=20):
        """Draw a pizza slice"""
        c.setFillColor(colors.HexColor('#FFD700'))
        path = c.beginPath()
        path.moveTo(x, y - size)
        path.lineTo(x - size*0.8, y + size*0.6)
        path.curveTo(x - size*0.5, y + size*0.8, x + size*0.5, y + size*0.8, x + size*0.8, y + size*0.6)
        path.close()
        c.drawPath(path, fill=1, stroke=1)
        c.setFillColor(colors.HexColor('#FF4444'))
        for px, py in [(x-size*0.3, y), (x+size*0.2, y+size*0.2), (x, y+size*0.4)]:
            c.circle(px, py, 3, fill=1, stroke=0)
        c.setFillColor(colors.black)
    
    @staticmethod
    def draw_carrot(c, x, y, size=20):
        """Draw a carrot"""
        c.setFillColor(colors.HexColor('#FF8C00'))
        path = c.beginPath()
        path.moveTo(x, y - size)
        path.lineTo(x - size*0.3, y + size*0.8)
        path.lineTo(x + size*0.3, y + size*0.8)
        path.close()
        c.drawPath(path, fill=1, stroke=1)
        c.setFillColor(colors.HexColor('#228B22'))
        for i in range(-1, 2):
            c.line(x + i*3, y - size, x + i*4, y - size - 8)
        c.setFillColor(colors.black)
    
    @staticmethod
    def draw_dog(c, x, y, size=20):
        """Draw a dog face"""
        c.setFillColor(colors.HexColor('#D2691E'))
        c.circle(x, y, size, fill=1, stroke=1)
        c.circle(x - size*0.7, y + size*0.5, size*0.4, fill=1, stroke=1)
        c.circle(x + size*0.7, y + size*0.5, size*0.4, fill=1, stroke=1)
        c.setFillColor(colors.white)
        c.circle(x - size*0.3, y + size*0.2, 4, fill=1, stroke=1)
        c.circle(x + size*0.3, y + size*0.2, 4, fill=1, stroke=1)
        c.setFillColor(colors.black)
        c.circle(x - size*0.3, y + size*0.2, 2, fill=1, stroke=0)
        c.circle(x + size*0.3, y + size*0.2, 2, fill=1, stroke=0)
        c.circle(x, y - size*0.2, 3, fill=1, stroke=1)
    
    @staticmethod
    def draw_cat(c, x, y, size=20):
        """Draw a cat face"""
        c.setFillColor(colors.HexColor('#FF8C00'))
        c.circle(x, y, size, fill=1, stroke=1)
        path = c.beginPath()
        path.moveTo(x - size*0.8, y + size*0.5)
        path.lineTo(x - size*0.5, y + size)
        path.lineTo(x - size*0.3, y + size*0.7)
        c.drawPath(path, fill=1, stroke=1)
        path = c.beginPath()
        path.moveTo(x + size*0.8, y + size*0.5)
        path.lineTo(x + size*0.5, y + size)
        path.lineTo(x + size*0.3, y + size*0.7)
        c.drawPath(path, fill=1, stroke=1)
        c.setFillColor(colors.white)
        c.circle(x - size*0.3, y + size*0.2, 4, fill=1, stroke=1)
        c.circle(x + size*0.3, y + size*0.2, 4, fill=1, stroke=1)
        c.setFillColor(colors.black)
        c.circle(x - size*0.3, y + size*0.2, 2, fill=1, stroke=0)
        c.circle(x + size*0.3, y + size*0.2, 2, fill=1, stroke=0)
        c.circle(x, y - size*0.2, 3, fill=1, stroke=1)
        for i in [-1, 1]:
            c.line(x, y - size*0.2, x + i*size*0.6, y - size*0.3)
    
    @staticmethod
    def draw_rabbit(c, x, y, size=20):
        """Draw a rabbit"""
        c.setFillColor(colors.HexColor('#E0E0E0'))
        c.circle(x, y, size*0.8, fill=1, stroke=1)
        c.ellipse(x - size*0.6, y + size*0.4, x - size*0.3, y + size*1.2, fill=1, stroke=1)
        c.ellipse(x + size*0.3, y + size*0.4, x + size*0.6, y + size*1.2, fill=1, stroke=1)
        c.setFillColor(colors.white)
        c.circle(x - size*0.25, y + size*0.15, 3, fill=1, stroke=1)
        c.circle(x + size*0.25, y + size*0.15, 3, fill=1, stroke=1)
        c.setFillColor(colors.black)
        c.circle(x - size*0.25, y + size*0.15, 1.5, fill=1, stroke=0)
        c.circle(x + size*0.25, y + size*0.15, 1.5, fill=1, stroke=0)
        c.circle(x, y - size*0.2, 2, fill=1, stroke=1)
    
    @staticmethod
    def draw_bear(c, x, y, size=20):
        """Draw a bear"""
        c.setFillColor(colors.HexColor('#8B4513'))
        c.circle(x, y, size, fill=1, stroke=1)
        c.circle(x - size*0.8, y + size*0.8, size*0.4, fill=1, stroke=1)
        c.circle(x + size*0.8, y + size*0.8, size*0.4, fill=1, stroke=1)
        c.setFillColor(colors.HexColor('#D2691E'))
        c.circle(x, y - size*0.3, size*0.4, fill=1, stroke=1)
        c.setFillColor(colors.white)
        c.circle(x - size*0.3, y + size*0.2, 4, fill=1, stroke=1)
        c.circle(x + size*0.3, y + size*0.2, 4, fill=1, stroke=1)
        c.setFillColor(colors.black)
        c.circle(x - size*0.3, y + size*0.2, 2, fill=1, stroke=0)
        c.circle(x + size*0.3, y + size*0.2, 2, fill=1, stroke=0)
        c.circle(x, y - size*0.3, 2, fill=1, stroke=1)
    
    @staticmethod
    def draw_fish(c, x, y, size=20):
        """Draw a fish"""
        c.setFillColor(colors.HexColor('#4A90E2'))
        path = c.beginPath()
        path.moveTo(x - size, y)
        path.curveTo(x - size, y + size*0.6, x + size*0.5, y + size*0.6, x + size*0.5, y)
        path.curveTo(x + size*0.5, y - size*0.6, x - size, y - size*0.6, x - size, y)
        c.drawPath(path, fill=1, stroke=1)
        path = c.beginPath()
        path.moveTo(x - size, y)
        path.lineTo(x - size - 8, y + 8)
        path.lineTo(x - size - 8, y - 8)
        path.close()
        c.drawPath(path, fill=1, stroke=1)
        c.setFillColor(colors.white)
        c.circle(x + size*0.2, y + size*0.2, 3, fill=1, stroke=1)
        c.setFillColor(colors.black)
        c.circle(x + size*0.2, y + size*0.2, 1.5, fill=1, stroke=0)
        c.setFillColor(colors.black)
    
    @staticmethod
    def draw_butterfly(c, x, y, size=20):
        """Draw a butterfly"""
        c.setFillColor(colors.HexColor('#4B2F23'))
        c.rect(x - 2, y - size*0.8, 4, size*1.6, fill=1, stroke=0)
        c.setFillColor(colors.HexColor('#FF6B9D'))
        for angle, scale in [(0.3, 0.8), (-0.3, 0.7)]:
            path = c.beginPath()
            path.moveTo(x, y + size*angle)
            path.curveTo(x - size*scale, y + size*(angle+0.5), x - size*scale, y + size*angle, x, y)
            c.drawPath(path, fill=1, stroke=1)
            path = c.beginPath()
            path.moveTo(x, y + size*angle)
            path.curveTo(x + size*scale, y + size*(angle+0.5), x + size*scale, y + size*angle, x, y)
            c.drawPath(path, fill=1, stroke=1)
        c.setStrokeColor(colors.HexColor('#4B2F23'))
        c.setLineWidth(1)
        c.line(x - 2, y + size*0.8, x - 5, y + size + 5)
        c.line(x + 2, y + size*0.8, x + 5, y + size + 5)
        c.circle(x - 5, y + size + 5, 2, fill=1, stroke=0)
        c.circle(x + 5, y + size + 5, 2, fill=1, stroke=0)
        c.setFillColor(colors.black)
        c.setStrokeColor(colors.black)
    
    @staticmethod
    def draw_bee(c, x, y, size=20):
        """Draw a bee"""
        c.setFillColor(colors.HexColor('#FFD700'))
        c.ellipse(x - size*0.6, y - size*0.4, x + size*0.6, y + size*0.4, fill=1, stroke=1)
        c.setFillColor(colors.black)
        for stripe_y in [y - size*0.15, y + size*0.15]:
            c.rect(x - size*0.6, stripe_y - 2, size*1.2, 4, fill=1, stroke=0)
        c.setFillColor(colors.HexColor('#87CEEB'))
        for wing_x in [x - size*0.3, x + size*0.3]:
            c.ellipse(wing_x - size*0.3, y + size*0.2, wing_x + size*0.3, y + size*0.8, fill=1, stroke=1)
        c.setFillColor(colors.black)
    
    @staticmethod
    def draw_star(c, x, y, size=20):
        """Draw a 5-pointed star"""
        c.setFillColor(colors.HexColor('#FFD700'))
        points = []
        for i in range(10):
            angle = math.pi / 2 + i * math.pi / 5
            r = size if i % 2 == 0 else size / 2.5
            px = x + r * math.cos(angle)
            py = y + r * math.sin(angle)
            points.extend([px, py])
        path = c.beginPath()
        path.moveTo(points[0], points[1])
        for i in range(2, len(points), 2):
            path.lineTo(points[i], points[i+1])
        path.close()
        c.drawPath(path, fill=1, stroke=1)
        c.setFillColor(colors.black)
    
    @staticmethod
    def draw_sun(c, x, y, size=20):
        """Draw a sun"""
        c.setFillColor(colors.HexColor('#FFD700'))
        c.circle(x, y, size*0.6, fill=1, stroke=1)
        for i in range(8):
            angle = i * math.pi / 4
            start_x = x + size*0.7 * math.cos(angle)
            start_y = y + size*0.7 * math.sin(angle)
            end_x = x + size * math.cos(angle)
            end_y = y + size * math.sin(angle)
            c.setLineWidth(3)
            c.line(start_x, start_y, end_x, end_y)
        c.setFillColor(colors.black)
    
    @staticmethod
    def draw_moon(c, x, y, size=20):
        """Draw a crescent moon"""
        c.setFillColor(colors.HexColor('#FFD700'))
        c.circle(x, y, size, fill=1, stroke=1)
        c.setFillColor(colors.white)
        c.circle(x + size*0.3, y, size*0.8, fill=1, stroke=0)
        c.setFillColor(colors.black)
    
    @staticmethod
    def draw_rocket(c, x, y, size=20):
        """Draw a rocket"""
        c.setFillColor(colors.HexColor('#FF4444'))
        path = c.beginPath()
        path.moveTo(x, y + size)
        path.lineTo(x - size*0.4, y + size*0.2)
        path.lineTo(x - size*0.4, y - size*0.6)
        path.lineTo(x + size*0.4, y - size*0.6)
        path.lineTo(x + size*0.4, y + size*0.2)
        path.close()
        c.drawPath(path, fill=1, stroke=1)
        c.setFillColor(colors.HexColor('#87CEEB'))
        c.circle(x, y + size*0.4, size*0.25, fill=1, stroke=1)
        c.setFillColor(colors.HexColor('#FFD700'))
        path = c.beginPath()
        path.moveTo(x - size*0.4, y - size*0.6)
        path.lineTo(x - size*0.6, y - size)
        path.lineTo(x, y - size*0.6)
        c.drawPath(path, fill=1, stroke=1)
        path = c.beginPath()
        path.moveTo(x + size*0.4, y - size*0.6)
        path.lineTo(x + size*0.6, y - size)
        path.lineTo(x, y - size*0.6)
        c.drawPath(path, fill=1, stroke=1)
        c.setFillColor(colors.black)
    
    @staticmethod
    def draw_car(c, x, y, size=20):
        """Draw a car"""
        c.setFillColor(colors.HexColor('#FF4444'))
        c.rect(x - size, y - size*0.3, size*2, size*0.6, fill=1, stroke=1)
        path = c.beginPath()
        path.moveTo(x - size*0.5, y + size*0.3)
        path.lineTo(x - size*0.3, y + size*0.8)
        path.lineTo(x + size*0.3, y + size*0.8)
        path.lineTo(x + size*0.5, y + size*0.3)
        path.close()
        c.drawPath(path, fill=1, stroke=1)
        c.setFillColor(colors.HexColor('#87CEEB'))
        c.rect(x - size*0.4, y + size*0.35, size*0.3, size*0.35, fill=1, stroke=1)
        c.rect(x + size*0.1, y + size*0.35, size*0.3, size*0.35, fill=1, stroke=1)
        c.setFillColor(colors.HexColor('#2F2F2F'))
        c.circle(x - size*0.6, y - size*0.3, size*0.25, fill=1, stroke=1)
        c.circle(x + size*0.6, y - size*0.3, size*0.25, fill=1, stroke=1)
        c.setFillColor(colors.black)
    
    @staticmethod
    def draw_tree(c, x, y, size=20):
        """Draw a tree"""
        c.setFillColor(colors.HexColor('#8B4513'))
        c.rect(x - size*0.2, y - size, size*0.4, size*0.8, fill=1, stroke=1)
        c.setFillColor(colors.HexColor('#228B22'))
        c.circle(x, y + size*0.3, size*0.6, fill=1, stroke=1)
        c.circle(x - size*0.4, y + size*0.5, size*0.5, fill=1, stroke=1)
        c.circle(x + size*0.4, y + size*0.5, size*0.5, fill=1, stroke=1)
        c.setFillColor(colors.black)
    
    @staticmethod
    def draw_flower(c, x, y, size=20):
        """Draw a flower"""
        c.setFillColor(colors.HexColor('#FF69B4'))
        for i in range(5):
            angle = i * 2 * math.pi / 5
            petal_x = x + size * 0.5 * math.cos(angle)
            petal_y = y + size * 0.5 * math.sin(angle)
            c.circle(petal_x, petal_y, size * 0.4, fill=1, stroke=1)
        c.setFillColor(colors.HexColor('#FFD700'))
        c.circle(x, y, size * 0.3, fill=1, stroke=1)
        c.setFillColor(colors.black)
    
    @staticmethod
    def draw_heart(c, x, y, size=20):
        """Draw a heart"""
        c.setFillColor(colors.HexColor('#FF1744'))
        s = size / 20
        path = c.beginPath()
        path.moveTo(x, y - 10*s)
        path.curveTo(x - 5*s, y - 15*s, x - 10*s, y - 10*s, x - 10*s, y - 5*s)
        path.curveTo(x - 10*s, y, x - 5*s, y + 5*s, x, y + 10*s)
        path.curveTo(x + 5*s, y + 5*s, x + 10*s, y, x + 10*s, y - 5*s)
        path.curveTo(x + 10*s, y - 10*s, x + 5*s, y - 15*s, x, y - 10*s)
        path.close()
        c.drawPath(path, fill=1, stroke=1)
        c.setFillColor(colors.black)
    
    @staticmethod
    def draw_circle(c, x, y, size=20):
        """Draw a simple circle"""
        c.setFillColor(colors.HexColor('#4A90E2'))
        c.circle(x, y, size, fill=1, stroke=1)
        c.setFillColor(colors.black)
    
    @staticmethod
    def draw_square(c, x, y, size=20):
        """Draw a simple square"""
        c.setFillColor(colors.HexColor('#4A90E2'))
        c.rect(x - size/2, y - size/2, size, size, fill=1, stroke=1)
        c.setFillColor(colors.black)
    
    @staticmethod
    def draw_triangle(c, x, y, size=20):
        """Draw a triangle"""
        c.setFillColor(colors.HexColor('#4A90E2'))
        path = c.beginPath()
        path.moveTo(x, y + size)
        path.lineTo(x - size * 0.866, y - size/2)
        path.lineTo(x + size * 0.866, y - size/2)
        path.close()
        c.drawPath(path, fill=1, stroke=1)
        c.setFillColor(colors.black)
    
    @staticmethod
    def draw_book(c, x, y, size=20):
        """Draw a book"""
        c.setFillColor(colors.HexColor('#4A90E2'))
        c.rect(x - size*0.6, y - size*0.8, size*1.2, size*1.6, fill=1, stroke=1)
        c.setStrokeColor(colors.white)
        c.setLineWidth(2)
        c.line(x, y - size*0.8, x, y + size*0.8)
        c.setStrokeColor(colors.black)
        c.setFillColor(colors.black)
    
    @staticmethod
    def draw_pencil(c, x, y, size=20):
        """Draw a pencil"""
        c.setFillColor(colors.HexColor('#FFD700'))
        c.rect(x - size*0.2, y - size, size*0.4, size*1.6, fill=1, stroke=1)
        c.setFillColor(colors.HexColor('#FF69B4'))
        c.rect(x - size*0.2, y + size*0.5, size*0.4, size*0.3, fill=1, stroke=1)
        c.setFillColor(colors.HexColor('#D2691E'))
        path = c.beginPath()
        path.moveTo(x - size*0.2, y - size)
        path.lineTo(x, y - size - size*0.3)
        path.lineTo(x + size*0.2, y - size)
        path.close()
        c.drawPath(path, fill=1, stroke=1)
        c.setFillColor(colors.black)


class HybridWorksheetGenerator:
    """Hybrid generator supporting both vector graphics and OpenMoji"""
    
    def __init__(self, output_path, title, grade, topic, theme="default", 
                 openmoji_dir='/mnt/skills/user/math-worksheet-generator/icons'):
        self.output_path = output_path
        self.title = title
        self.grade = grade
        self.topic = topic
        self.theme = theme
        self.problems = []
        self.answers = []
        self.width, self.height = letter
        self.margin = 0.75 * inch
        
        # OpenMoji support
        self.openmoji_dir = Path(openmoji_dir)
        self.openmoji_enabled = self.openmoji_dir.exists()
        
        # Vector graphics library
        self.vector_lib = VectorGraphicsLibrary()
        
        # Map of object names to drawing functions
        self.vector_methods = {
            'apple': self.vector_lib.draw_apple,
            'banana': self.vector_lib.draw_banana,
            'orange': self.vector_lib.draw_orange,
            'strawberry': self.vector_lib.draw_strawberry,
            'cookie': self.vector_lib.draw_cookie,
            'pizza': self.vector_lib.draw_pizza,
            'carrot': self.vector_lib.draw_carrot,
            'dog': self.vector_lib.draw_dog,
            'cat': self.vector_lib.draw_cat,
            'rabbit': self.vector_lib.draw_rabbit,
            'bear': self.vector_lib.draw_bear,
            'fish': self.vector_lib.draw_fish,
            'butterfly': self.vector_lib.draw_butterfly,
            'bee': self.vector_lib.draw_bee,
            'star': self.vector_lib.draw_star,
            'starfish': self.vector_lib.draw_star,
            'sun': self.vector_lib.draw_sun,
            'moon': self.vector_lib.draw_moon,
            'rocket': self.vector_lib.draw_rocket,
            'car': self.vector_lib.draw_car,
            'tree': self.vector_lib.draw_tree,
            'flower': self.vector_lib.draw_flower,
            'heart': self.vector_lib.draw_heart,
            'circle': self.vector_lib.draw_circle,
            'square': self.vector_lib.draw_square,
            'triangle': self.vector_lib.draw_triangle,
            'book': self.vector_lib.draw_book,
            'pencil': self.vector_lib.draw_pencil,
        }
        
        # OpenMoji code mapping (for if OpenMoji is available)
        self.openmoji_codes = {
            'apple': '1F34E', 'banana': '1F34C', 'orange': '1F34A',
            'strawberry': '1F353', 'cookie': '1F36A', 'pizza': '1F355',
            'dog': '1F436', 'cat': '1F431', 'rabbit': '1F430',
            'bear': '1F43B', 'fish': '1F41F', 'butterfly': '1F98B',
            # ... add more as needed
        }
    
    def add_problem(self, question_text, answer, visual_data=None):
        """Add a problem with optional visual data"""
        self.problems.append({
            'question': question_text,
            'visual': visual_data,
            'number': len(self.problems) + 1
        })
        self.answers.append({
            'number': len(self.answers) + 1,
            'answer': answer
        })
    
    def has_openmoji_icon(self, object_type):
        """Check if OpenMoji icon exists for this object"""
        if not self.openmoji_enabled:
            return False
        code = self.openmoji_codes.get(object_type.lower())
        if not code:
            return False
        icon_path = self.openmoji_dir / f"{code}.svg"
        return icon_path.exists()
    
    def draw_openmoji_icon(self, c, object_type, x, y, size=20):
        """Draw OpenMoji SVG icon"""
        code = self.openmoji_codes.get(object_type.lower())
        if not code:
            return False
        
        icon_path = self.openmoji_dir / f"{code}.svg"
        if not icon_path.exists():
            return False
        
        try:
            # For now, just note that SVG would be rendered here
            # This requires svglib: from svglib.svglib import svg2rlg
            # For this implementation, we'll fall back to vector graphics
            return False
        except Exception:
            return False
    
    def draw_themed_object(self, c, object_type, x, y, size=20):
        """Draw object using hybrid approach: OpenMoji → Vector → Circle fallback"""
        # Try OpenMoji first (if available)
        if self.openmoji_enabled and self.has_openmoji_icon(object_type):
            if self.draw_openmoji_icon(c, object_type, x, y, size):
                return True
        
        # Fall back to vector graphics
        draw_method = self.vector_methods.get(object_type.lower())
        if draw_method:
            draw_method(c, x, y, size)
            return True
        
        # Final fallback to simple circle
        self.vector_lib.draw_circle(c, x, y, size)
        return True
    
    def draw_visual_for_problem(self, c, visual_data, x, y):
        """Draw the visual elements for a problem"""
        if not visual_data:
            return y
        
        visual_type = visual_data.get('type')
        
        if visual_type == 'countable_objects':
            objects = visual_data.get('objects', [])
            object_type = visual_data.get('object_type', 'circle')
            spacing = 40
            items_per_row = 10
            
            current_x = x
            current_y = y
            
            for i, obj in enumerate(objects):
                if i > 0 and i % items_per_row == 0:
                    current_y -= spacing
                    current_x = x
                
                self.draw_themed_object(c, object_type, current_x, current_y, size=15)
                current_x += spacing
            
            return current_y - 50
        
        elif visual_type == 'grouped_objects':
            groups = visual_data.get('groups', [])
            object_type = visual_data.get('object_type', 'circle')
            spacing = 40
            group_spacing = 70
            
            current_x = x
            current_y = y
            
            for group_idx, group in enumerate(groups):
                for i in range(group):
                    self.draw_themed_object(c, object_type, current_x, current_y, size=15)
                    current_x += spacing
                
                if group_idx < len(groups) - 1:
                    current_x += spacing / 2
                    c.setFont("Helvetica-Bold", 20)
                    c.drawString(current_x - 12, current_y - 8, "+")
                    c.setFont("Helvetica", 11)
                    current_x += spacing
            
            return current_y - 50
        
        elif visual_type == 'array':
            rows = visual_data.get('rows', 3)
            cols = visual_data.get('cols', 4)
            object_type = visual_data.get('object_type', 'circle')
            spacing = 35
            
            for row in range(rows):
                for col in range(cols):
                    obj_x = x + col * spacing
                    obj_y = y - row * spacing
                    self.draw_themed_object(c, object_type, obj_x, obj_y, size=12)
            
            return y - (rows * spacing) - 20
        
        elif visual_type == 'number_line':
            start = visual_data.get('start', 0)
            end = visual_data.get('end', 10)
            length = 400
            
            c.setLineWidth(2)
            c.line(x, y, x + length, y)
            
            num_ticks = end - start + 1
            tick_spacing = length / (num_ticks - 1)
            
            for i in range(num_ticks):
                tick_x = x + i * tick_spacing
                c.line(tick_x, y - 5, tick_x, y + 5)
                c.setFont("Helvetica", 10)
                c.drawCentredString(tick_x, y - 20, str(start + i))
            
            c.setFont("Helvetica", 11)
            return y - 50
        
        elif visual_type == 'fraction_circle':
            total_parts = visual_data.get('total_parts', 4)
            shaded_parts = visual_data.get('shaded_parts', 1)
            radius = 40
            
            center_x = x + radius + 20
            center_y = y - radius - 20
            
            c.setStrokeColor(colors.black)
            c.setLineWidth(2)
            c.circle(center_x, center_y, radius, fill=0, stroke=1)
            
            for i in range(total_parts):
                angle = (2 * math.pi * i / total_parts) - math.pi / 2
                end_x = center_x + radius * math.cos(angle)
                end_y = center_y + radius * math.sin(angle)
                c.line(center_x, center_y, end_x, end_y)
            
            c.setFillColor(colors.HexColor('#4A90E2'))
            for i in range(shaded_parts):
                angle1 = (2 * math.pi * i / total_parts) - math.pi / 2
                angle2 = (2 * math.pi * (i + 1) / total_parts) - math.pi / 2
                
                path = c.beginPath()
                path.moveTo(center_x, center_y)
                for step in range(20):
                    t = step / 20
                    angle = angle1 + (angle2 - angle1) * t
                    arc_x = center_x + radius * math.cos(angle)
                    arc_y = center_y + radius * math.sin(angle)
                    path.lineTo(arc_x, arc_y)
                path.close()
                c.drawPath(path, fill=1, stroke=0)
            
            c.setFillColor(colors.black)
            c.setStrokeColor(colors.black)
            return center_y - radius - 30
        
        return y
    
    def generate_worksheet(self):
        """Generate the main worksheet PDF"""
        c = canvas.Canvas(self.output_path, pagesize=letter)
        
        # Header
        c.setFont("Helvetica-Bold", 20)
        c.drawCentredString(self.width / 2, self.height - self.margin, self.title)
        
        c.setFont("Helvetica", 12)
        c.drawCentredString(self.width / 2, self.height - self.margin - 25, 
                           f"Grade {self.grade} | {self.topic}")
        
        c.setFont("Helvetica", 10)
        c.drawString(self.margin, self.height - self.margin - 45, "Name: _________________")
        c.drawString(self.width - self.margin - 120, self.height - self.margin - 45, 
                    "Date: _________________")
        
        c.setLineWidth(1)
        c.line(self.margin, self.height - self.margin - 60, 
               self.width - self.margin, self.height - self.margin - 60)
        
        current_y = self.height - self.margin - 100
        problems_per_page = 5
        
        for i, problem in enumerate(self.problems):
            if i > 0 and i % problems_per_page == 0:
                c.showPage()
                current_y = self.height - self.margin
            
            c.setFont("Helvetica-Bold", 12)
            c.drawString(self.margin, current_y, f"{problem['number']}.")
            
            c.setFont("Helvetica", 11)
            question_x = self.margin + 30
            c.drawString(question_x, current_y, problem['question'])
            
            visual_y = current_y - 30
            if problem['visual']:
                visual_y = self.draw_visual_for_problem(c, problem['visual'], 
                                                       question_x, visual_y)
            
            answer_y = visual_y - 20
            c.setFont("Helvetica", 11)
            c.drawString(question_x, answer_y, "Answer: _________________")
            
            current_y = answer_y - 50
        
        # Attribution footer
        c.setFont("Helvetica-Oblique", 8)
        footer_text = "Great job! You're doing awesome!"
        if self.openmoji_enabled:
            footer_text += " • Icons by OpenMoji (CC BY-SA 4.0)"
        c.drawCentredString(self.width / 2, self.margin - 20, footer_text)
        
        c.save()
        print(f"✅ Worksheet generated: {self.output_path}")
    
    def generate_answer_key(self, answer_key_path):
        """Generate the answer key PDF"""
        c = canvas.Canvas(answer_key_path, pagesize=letter)
        
        c.setFont("Helvetica-Bold", 20)
        c.drawCentredString(self.width / 2, self.height - self.margin, 
                          f"{self.title} - ANSWER KEY")
        
        c.setFont("Helvetica", 12)
        c.drawCentredString(self.width / 2, self.height - self.margin - 25, 
                          f"Grade {self.grade} | {self.topic}")
        
        c.setLineWidth(1)
        c.line(self.margin, self.height - self.margin - 40, 
               self.width - self.margin, self.height - self.margin - 40)
        
        current_y = self.height - self.margin - 70
        answers_per_column = 20
        column_width = (self.width - 2 * self.margin) / 2
        
        c.setFont("Helvetica", 11)
        
        for i, answer in enumerate(self.answers):
            if i > 0 and i % answers_per_column == 0:
                if i % (answers_per_column * 2) == 0:
                    c.showPage()
                    current_y = self.height - self.margin
                else:
                    current_y = self.height - self.margin - 70
            
            column = (i // answers_per_column) % 2
            x_pos = self.margin + (column * column_width)
            row_in_column = i % answers_per_column
            y_pos = current_y - (row_in_column * 25)
            
            c.drawString(x_pos, y_pos, f"{answer['number']}. {answer['answer']}")
        
        c.save()
        print(f"✅ Answer key generated: {answer_key_path}")
    
    @classmethod
    def list_available_objects(cls):
        """List all available objects from vector library"""
        temp = cls('/tmp/temp.pdf', 'Test', 1, 'Test')
        return sorted(temp.vector_methods.keys())


def create_sample_worksheets():
    """Create comprehensive sample worksheets"""
    
    print("Creating sample worksheets with hybrid approach...")
    
    # Grade 1: Food theme
    gen1 = HybridWorksheetGenerator(
        output_path='/mnt/user-data/outputs/hybrid_grade1_food.pdf',
        title='Addition Practice - Food Fun!',
        grade=1,
        topic='Addition within 10',
        theme='food'
    )
    
    gen1.add_problem(
        question_text="Count all the apples:",
        answer="7 apples",
        visual_data={'type': 'countable_objects', 'object_type': 'apple', 'objects': list(range(7))}
    )
    
    gen1.add_problem(
        question_text="How many strawberries in total?",
        answer="3 + 2 = 5",
        visual_data={'type': 'grouped_objects', 'object_type': 'strawberry', 'groups': [3, 2]}
    )
    
    gen1.add_problem(
        question_text="Count the cookies:",
        answer="9 cookies",
        visual_data={'type': 'countable_objects', 'object_type': 'cookie', 'objects': list(range(9))}
    )
    
    gen1.add_problem(
        question_text="Add the pizza slices:",
        answer="4 + 3 = 7",
        visual_data={'type': 'grouped_objects', 'object_type': 'pizza', 'groups': [4, 3]}
    )
    
    gen1.generate_worksheet()
    gen1.generate_answer_key('/mnt/user-data/outputs/hybrid_grade1_food_answers.pdf')
    
    # Grade 2: Animals theme
    gen2 = HybridWorksheetGenerator(
        output_path='/mnt/user-data/outputs/hybrid_grade2_animals.pdf',
        title='Counting Animals',
        grade=2,
        topic='Counting and Basic Addition',
        theme='animals'
    )
    
    gen2.add_problem(
        question_text="Count the dogs:",
        answer="8 dogs",
        visual_data={'type': 'countable_objects', 'object_type': 'dog', 'objects': list(range(8))}
    )
    
    gen2.add_problem(
        question_text="How many cats and rabbits together?",
        answer="5 + 4 = 9",
        visual_data={'type': 'grouped_objects', 'object_type': 'cat', 'groups': [5, 4]}
    )
    
    gen2.add_problem(
        question_text="Count all the bears:",
        answer="6 bears",
        visual_data={'type': 'countable_objects', 'object_type': 'bear', 'objects': list(range(6))}
    )
    
    gen2.generate_worksheet()
    gen2.generate_answer_key('/mnt/user-data/outputs/hybrid_grade2_animals_answers.pdf')
    
    # Grade 3: Mixed theme multiplication
    gen3 = HybridWorksheetGenerator(
        output_path='/mnt/user-data/outputs/hybrid_grade3_multiplication.pdf',
        title='Multiplication Arrays',
        grade=3,
        topic='Multiplication Facts',
        theme='mixed'
    )
    
    gen3.add_problem(
        question_text="How many fish in the array? ___ × ___ = ___",
        answer="3 × 4 = 12",
        visual_data={'type': 'array', 'object_type': 'fish', 'rows': 3, 'cols': 4}
    )
    
    gen3.add_problem(
        question_text="Count the stars: ___ × ___ = ___",
        answer="2 × 6 = 12",
        visual_data={'type': 'array', 'object_type': 'star', 'rows': 2, 'cols': 6}
    )
    
    gen3.add_problem(
        question_text="How many butterflies? ___ × ___ = ___",
        answer="3 × 3 = 9",
        visual_data={'type': 'array', 'object_type': 'butterfly', 'rows': 3, 'cols': 3}
    )
    
    gen3.add_problem(
        question_text="Count the hearts: ___ × ___ = ___",
        answer="4 × 2 = 8",
        visual_data={'type': 'array', 'object_type': 'heart', 'rows': 4, 'cols': 2}
    )
    
    gen3.generate_worksheet()
    gen3.generate_answer_key('/mnt/user-data/outputs/hybrid_grade3_multiplication_answers.pdf')
    
    print("\n✅ All sample worksheets created!")
    print("\nAvailable objects in vector library:")
    objects = HybridWorksheetGenerator.list_available_objects()
    for i, obj in enumerate(objects, 1):
        print(f"  {i:2d}. {obj}")


def main():
    parser = argparse.ArgumentParser(description='Hybrid Math Worksheet Generator')
    parser.add_argument('--create-samples', action='store_true', 
                       help='Create sample worksheets')
    parser.add_argument('--list-objects', action='store_true',
                       help='List all available objects')
    
    args = parser.parse_args()
    
    if args.create_samples:
        create_sample_worksheets()
    elif args.list_objects:
        objects = HybridWorksheetGenerator.list_available_objects()
        print(f"\n📚 Available Objects ({len(objects)}):\n")
        for i, obj in enumerate(objects, 1):
            print(f"  {i:2d}. {obj}")
        print()
    else:
        parser.print_help()


if __name__ == '__main__':
    main()